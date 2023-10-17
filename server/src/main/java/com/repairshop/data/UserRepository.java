package com.repairshop.data;

import com.repairshop.models.User;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.transaction.annotation.Transactional;

import java.util.Collection;
import java.util.List;

public interface UserRepository {
    @Transactional
    List<User> findAllUsers();

    @Transactional
    User findByUsername(String username);

    @Transactional
    User createUser(User user);

    @Transactional
    boolean updateUser(User user);

    @Transactional
    boolean deleteUser(int userId);
}
