package com.repairshop.data;

import com.repairshop.models.Customer;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

public interface CustomerRepository {
    @Transactional
    List<Customer> findAllCustomers();

    @Transactional
    Customer findCustomerById(int customerId);

    @Transactional
    Customer createCustomer(Customer customer);

    @Transactional
    boolean updateCustomer(Customer customer);

    @Transactional
    boolean deleteCustomerById(int customerId);
}
