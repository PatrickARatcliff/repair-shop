package com.repairshop.data.mappers;

import com.repairshop.models.Customer;
import org.springframework.jdbc.core.RowMapper;

import java.sql.ResultSet;
import java.sql.SQLException;

public class CustomerMapper implements RowMapper<Customer> {
    @Override
    public Customer mapRow(ResultSet resultSet, int i) throws SQLException {
        Customer customer = new Customer();
        customer.setCustomerId(resultSet.getInt("customer_id"));
        customer.setCustomerFirstName(resultSet.getString("first_name"));
        customer.setCustomerLastName(resultSet.getString("last_name"));
        customer.setCustomerPhone(resultSet.getString("customer_phone"));
        customer.setCustomerEmail(resultSet.getString("customer_email"));
        customer.setImportant(resultSet.getBoolean("important"));
        return customer;
    }
}
