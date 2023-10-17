package com.repairshop.data;

import com.repairshop.data.mappers.CustomerMapper;
import com.repairshop.models.Customer;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.support.GeneratedKeyHolder;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.sql.PreparedStatement;
import java.sql.Statement;
import java.util.List;

@Repository
public class CustomerJdbcTemplateRepository implements CustomerRepository {

    private final JdbcTemplate jdbcTemplate;

    public CustomerJdbcTemplateRepository(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }


    @Override
    @Transactional
    public List<Customer> findAllCustomers() {

        final String sql = "select customer_id, first_name, last_name, customer_phone, customer_email, important"
                + "from customer;";

        return jdbcTemplate.query(sql, new CustomerMapper());
    }

    @Override
    @Transactional
    public Customer findCustomerById(int customerId) {

        final String sql = "select customer_id, first_name, last_name, customer_phone, customer_email, important"
                + "from customer "
                + "where customer_id = ?;";

        return jdbcTemplate.query(sql, new CustomerMapper(), customerId)
                .stream()
                .findFirst().orElse(null);
    }

    @Override
    @Transactional
    public Customer createCustomer(Customer customer) {

        final String sql = "insert into customer (first_name, last_name, customer_phone, customer_email, important) values (?, ?, ?, ?, ?);";

        GeneratedKeyHolder keyHolder = new GeneratedKeyHolder();
        int rowsAffected = jdbcTemplate.update(connection -> {
            PreparedStatement ps = connection.prepareStatement(sql, Statement.RETURN_GENERATED_KEYS);
            ps.setString(1, customer.getCustomerFirstName());
            ps.setString(2, customer.getCustomerLastName());
            ps.setString(3, customer.getCustomerPhone());
            ps.setString(4, customer.getCustomerEmail());
            ps.setBoolean(5, customer.isImportant());
            return ps;
        }, keyHolder);

        if (rowsAffected <= 0) {
            return null;
        }

        customer.setCustomerId(keyHolder.getKey().intValue());

        return customer;
    }

    @Override
    @Transactional
    public boolean updateCustomer(Customer customer) {

        final String sql = "update customer set "
                + "first_name = ?, "
                + "last_name = ?, "
                + "customer_phone = ?, "
                + "customer_email = ?, "
                + "important = ? "
                + "where customer_id = ?";

        boolean updated = jdbcTemplate.update(sql,
                customer.getCustomerFirstName(), customer.getCustomerLastName(), customer.getCustomerPhone(), customer.getCustomerEmail(), customer.isImportant(), customer.getCustomerId()) > 0;

        return updated;
    }

    @Override
    @Transactional
    public boolean deleteCustomerById(int customerId) {
        final String sql = "delete from customer where customer_id = ?";
        return jdbcTemplate.update(sql, customerId) > 0;
    }
}
