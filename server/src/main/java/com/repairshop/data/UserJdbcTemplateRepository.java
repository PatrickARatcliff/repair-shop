package com.repairshop.data;

import com.repairshop.data.mappers.UserMapper;
import com.repairshop.models.User;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.support.GeneratedKeyHolder;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.sql.PreparedStatement;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

@Repository
public class UserJdbcTemplateRepository implements UserRepository {

    private final JdbcTemplate jdbcTemplate;

    public UserJdbcTemplateRepository(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }


    @Override
    @Transactional
    public List<User> findAllUsers() {
        final String sql = "select u.user_id, u.username, u.password_hash, u.enabled, r.name as role " +
                "from `user` u " +
                "left join user_role ur on u.user_id = ur.user_id " +
                "left join `role` r on ur.role_id = r.role_id";

        return jdbcTemplate.query(sql, (rs, rowNum) -> {
            List<String> roles = new ArrayList<>();
            roles.add(rs.getString("role"));
            return new UserMapper(roles).mapRow(rs, rowNum);
        });
    }

    @Override
    @Transactional
    public User findByUsername(String username) {
        List<String> roles = getRolesByUsername(username);

        final String sql = "select user_id, username, password_hash, enabled "
                + "from user "
                + "where username = ?;";

        return jdbcTemplate.query(sql, new UserMapper(roles), username)
                .stream()
                .findFirst().orElse(null);
    }

    @Override
    @Transactional
    public User createUser(User user) {

        final String sql = "insert into user (username, password_hash) values (?, ?);";

        GeneratedKeyHolder keyHolder = new GeneratedKeyHolder();
        int rowsAffected = jdbcTemplate.update(connection -> {
            PreparedStatement ps = connection.prepareStatement(sql, Statement.RETURN_GENERATED_KEYS);
            ps.setString(1, user.getUsername());
            ps.setString(2, user.getPassword());
            return ps;
        }, keyHolder);

        if (rowsAffected <= 0) {
            return null;
        }

        user.setUserId(keyHolder.getKey().intValue());

        updateRoles(user);

        return user;
    }

    @Override
    @Transactional
    public boolean updateUser(User user) {

        final String sql = "update user set "
                + "username = ?, "
                + "password = ?, "
                + "enabled = ? "
                + "where user_id = ?";

        boolean updated = jdbcTemplate.update(sql,
                user.getUsername(), user.getPassword(), user.isEnabled(), user.getUserId()) > 0;

        if (updated) {
            updateRoles(user);
        }

        return updated;
    }

    @Override
    @Transactional
    public boolean deleteUserById(int userId) {
        String updateAppointmentsSQL = "update appointment set user_id = 0 where user_id = ?";
        jdbcTemplate.update(updateAppointmentsSQL, userId);

        String deleteUserRoleSQL = "delete from user_role where user_id = ?";
        jdbcTemplate.update(deleteUserRoleSQL, userId);

        String deleteUserSQL = "delete from `user` where user_id = ?";
        int rowsAffected = jdbcTemplate.update(deleteUserSQL, userId);

        return rowsAffected > 0;
    }

    private void updateRoles(User user) {
        jdbcTemplate.update("delete from user_role where user_id = ?;", user.getUserId());

        Collection<GrantedAuthority> authorities = user.getAuthorities();

        if (authorities == null) {
            return;
        }

        for (GrantedAuthority role : authorities) {
            String sql = "insert into user_role (user_id, role_id) "
                    + "select ?, role_id from role where `name` = ?;";
            jdbcTemplate.update(sql, user.getUserId(), role.getAuthority());
        }
    }

    private List<String> getRolesByUsername(String username) {
        final String sql = "select r.name "
                + "from user_role ur "
                + "inner join role r on ur.role_id = r.role_id "
                + "inner join user au on ur.user_id = au.user_id "
                + "where au.username = ?";
        return jdbcTemplate.query(sql, (rs, rowId) -> rs.getString("name"), username);
    }
}