package com.repairshop.domain;

import com.repairshop.data.CustomerRepository;
import com.repairshop.models.Customer;
import org.junit.jupiter.api.Test;
import org.mockito.Mock;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;

import javax.validation.Validator;
import java.util.Collections;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.when;

@SpringBootTest
class CustomerServiceTest {

    @MockBean
    private CustomerRepository customerRepository;

    @Mock
    private Validator validator;

    @Autowired
    private CustomerService customerService;

    @Test
    void shouldFindAllCustomers() {
        List<Customer> expected = List.of(
                new Customer(1, "John", "Doe", "1234567890", "john.doe@example.com", true),
                new Customer(2, "Alice", "Smith", "9876543210", "alice.smith@example.com", false)
        );

        when(customerRepository.findAllCustomers()).thenReturn(expected);

        List<Customer> actual = customerService.findAllCustomers();

        assertEquals(expected, actual);
    }

    @Test
    void shouldFindCustomerById() {
        Customer expected = new Customer(1, "John", "Doe", "1234567890", "john.doe@example.com", true);
        when(customerRepository.findCustomerById(1)).thenReturn(expected);

        Customer actual = customerService.findCustomerById(1);
        assertEquals(expected, actual);
    }

    @Test
    void shouldNotFindByInvalidId() {
        when(customerRepository.findCustomerById(99)).thenReturn(null);
        Customer actual = customerService.findCustomerById(99);
        assertNull(actual);
    }

    @Test
    void shouldCreateCustomer() {
        Customer newCustomer = new Customer(0, "Alice", "Smith", "9876543210", "alice.smith@example.com", true);
        when(validator.validate(newCustomer)).thenReturn(Collections.emptySet());
        when(customerRepository.createCustomer(newCustomer)).thenReturn(newCustomer);

        Result<Customer> result = customerService.createCustomer(newCustomer);

        assertTrue(result.isSuccess());
        assertEquals(newCustomer, result.getPayload());
    }

    @Test
    void shouldNotCreateInvalidCustomer() {
        Customer newCustomer = new Customer(0, "Bob", "", "", "", false);
        when(validator.validate(newCustomer)).thenReturn(Collections.emptySet());

        Result<Customer> result = customerService.createCustomer(newCustomer);

        assertFalse(result.isSuccess());
        assertEquals(3, result.getMessages().size());
    }

    @Test
    void shouldUpdateCustomer() {
        Customer existingCustomer = new Customer(1, "Alice", "Smith", "9876543210", "alice.smith@example.com", true);
        when(validator.validate(existingCustomer)).thenReturn(Collections.emptySet());
        when(customerRepository.updateCustomer(existingCustomer)).thenReturn(true);

        Result<Customer> result = customerService.updateCustomer(existingCustomer);

        assertTrue(result.isSuccess());
    }

    @Test
    void shouldNotUpdateInvalidCustomer() {
        Customer existingCustomer = new Customer(1, "Alice", "Smith", "9876543210", "alice.smith@example.com", true);
        when(validator.validate(existingCustomer)).thenReturn(Collections.emptySet());

        existingCustomer.setCustomerEmail("invalid-email");
        Result<Customer> result = customerService.updateCustomer(existingCustomer);

        assertFalse(result.isSuccess());
        assertEquals(1, result.getMessages().size());
    }

    @Test
    void shouldDeleteCustomerById() {
        when(customerRepository.deleteCustomerById(1)).thenReturn(true);

        Result<Customer> result = customerService.deleteCustomerById(1);
        assertTrue(result.isSuccess());
    }

    @Test
    void shouldNotDeleteCustomerByInvalidId() {
        when(customerRepository.deleteCustomerById(99)).thenReturn(false);

        Result<Customer> result = customerService.deleteCustomerById(99);
        assertFalse(result.isSuccess());
    }
}
