package com.repairshop.data;

import com.repairshop.models.Customer;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.jdbc.core.JdbcTemplate;

import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
class CustomerJdbcTemplateRepositoryTest {

    @Autowired
    JdbcTemplate jdbcTemplate;

    @Autowired
    CustomerJdbcTemplateRepository repository;

    static boolean hasRun = false;

    @BeforeEach
    void setup() {
        if (!hasRun) {
            jdbcTemplate.update("call set_known_good_state();");
            hasRun = true;
        }
    }

    @Test
    void shouldFindAllCustomers() {
        List<Customer> actual = repository.findAllCustomers();
        assertTrue(actual.size() > 1 && actual.size() < 5);
    }

    @Test
    void shouldFindCustomerOneById() {
        Customer actual = repository.findCustomerById(1);

        assertEquals("One", actual.getCustomerLastName());
    }

    @Test
    void shouldCreateTestCustomer() {
        Customer customer = new Customer(0, "test", "customer", "999-999-9999", "test@customer.com", true);

        Customer actual = repository.createCustomer(customer);

        assertEquals(4, actual.getCustomerId());

        Customer test = repository.findCustomerById(4);

        assertTrue(test.isImportant());
        assertEquals("customer", test.getCustomerLastName());
    }

    @Test
    void shouldUpdateCustomerOne() {
        Customer customer = repository.findCustomerById(1);
        customer.setImportant(true);

        assertTrue(repository.updateCustomer(customer));

        Customer updatedCustomerOne = repository.findCustomerById(1);
        assertTrue(updatedCustomerOne.isImportant());
    }

    @Test
    void shouldDeleteCustomerThreeById() {
        assertTrue(repository.deleteCustomerById(3));

        assertNull(repository.findCustomerById(3));
    }
}