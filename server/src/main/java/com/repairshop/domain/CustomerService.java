package com.repairshop.domain;

import com.repairshop.data.CustomerRepository;
import com.repairshop.models.Customer;
import org.springframework.stereotype.Service;

import javax.validation.ConstraintViolation;
import javax.validation.Validator;
import java.util.List;
import java.util.Set;

@Service
public class CustomerService {

    private final CustomerRepository repository;

    private final Validator validator;

    public CustomerService(CustomerRepository repository,
                       Validator validator) {
        this.repository = repository;
        this.validator = validator;
    }

    public List<Customer> findAllCustomers() {
        return repository.findAllCustomers();
    }

    public Customer findCustomerById(int customerId) {
        return repository.findCustomerById(customerId);
    }

    public Result<Customer> createCustomer(Customer customer) {
        Result<Customer> result = validate(customer);
        if (result.getStatus() != ActionStatus.SUCCESS) {
            return result;
        }

        Customer inserted = repository.createCustomer(customer);
        if (inserted == null) {
            result.addMessage(ActionStatus.INVALID, "insert failed");
        } else {
            result.setPayload(inserted);
        }

        return result;
    }

    public Result<Customer> updateCustomer(Customer customer) {

        Result<Customer> result = validate(customer);
        if (result.getStatus() != ActionStatus.SUCCESS) {
            return result;
        }

        if (!repository.updateCustomer(customer)) {
            result.addMessage(ActionStatus.NOT_FOUND, "Customer ID `" + customer.getCustomerId() + "` not found.");
        }

        return result;
    }

    public Result<Customer> deleteCustomerById(int customerId) {
        Result<Customer> result = new Result<>();
        boolean deleted = repository.deleteCustomerById(customerId);
        if (!deleted) {
            result.addMessage(ActionStatus.NOT_FOUND, "Customer ID `" + customerId + "` not found.");
        }
        return result;
    }

    private Result<Customer> validate(Customer customer) {
        Result<Customer> result = new Result<>();

        if (customer == null) {
            result.addMessage(ActionStatus.INVALID, "Customer cannot be null.");
            return result;
        }

        if (customer.getCustomerFirstName() == null || customer.getCustomerFirstName().isEmpty()) {
            result.addMessage(ActionStatus.INVALID, "First name is required.");
        }
        if (customer.getCustomerLastName() == null || customer.getCustomerLastName().isEmpty()) {
            result.addMessage(ActionStatus.INVALID, "Last name is required.");
        }

        if (customer.getCustomerPhone() == null || customer.getCustomerPhone().isEmpty()) {
            result.addMessage(ActionStatus.INVALID, "Customer phone is required.");
        }
        if (customer.getCustomerEmail() == null || customer.getCustomerEmail().isEmpty()) {
            result.addMessage(ActionStatus.INVALID, "Customer email is required.");
        }

        if (!result.isSuccess()) {
            return result;
        }

        Set<ConstraintViolation<Customer>> violations = validator.validate(customer);
        for (ConstraintViolation<Customer> violation : violations) {
            result.addMessage(ActionStatus.INVALID, violation.getMessage());
        }

        return result;
    }

}
