package com.repairshop.controllers;

import com.repairshop.domain.CustomerService;
import com.repairshop.domain.Result;
import com.repairshop.models.Customer;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = {"http://localhost:3000/repair-shop"})
@RequestMapping("/customer")
public class CustomerController {

    private final CustomerService service;

    public CustomerController(CustomerService service) {
        this.service = service;
    }

    @GetMapping
    public List<Customer> findAllCustomers() {
        return service.findAllCustomers();
    }

    @GetMapping("/{customerId}")
    public ResponseEntity<Customer> findCustomerById(@PathVariable int customerId) {
        Customer customer = service.findCustomerById(customerId);
        if (customer == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(customer);
    }

    @PostMapping
    public ResponseEntity<Customer> createCustomer(@RequestBody Customer customer) {
        Result<Customer> result = service.createCustomer(customer);
        return new ResponseEntity<>(result.getPayload(), getStatus(result, HttpStatus.CREATED));
    }

    @PutMapping("/{customerId}")
    public ResponseEntity<Void> updateCustomer(@PathVariable int customerId, @RequestBody Customer customer) {
        if (customer != null && customer.getCustomerId() != customerId) {
            return new ResponseEntity<>(HttpStatus.CONFLICT);
        }
        Result<Customer> result = service.updateCustomer(customer);
        return new ResponseEntity<>(getStatus(result, HttpStatus.NO_CONTENT));
    }

    @DeleteMapping("/{customerId}")
    public ResponseEntity<Void> deleteCustomer(@PathVariable int customerId) {
        Result<Customer> result = service.deleteCustomerById(customerId);
        return new ResponseEntity<>(getStatus(result, HttpStatus.NO_CONTENT));
    }

    private HttpStatus getStatus(Result<Customer> result, HttpStatus statusDefault) {
        switch (result.getStatus()) {
            case INVALID:
                return HttpStatus.PRECONDITION_FAILED;
            case DUPLICATE:
                return HttpStatus.FORBIDDEN;
            case NOT_FOUND:
                return HttpStatus.NOT_FOUND;
        }
        return statusDefault;
    }
}
