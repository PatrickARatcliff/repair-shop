package com.repairshop.domain;

import com.repairshop.data.CustomerRepository;
import com.repairshop.data.VehicleRepository;
import com.repairshop.models.Customer;
import com.repairshop.models.Vehicle;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.anyInt;
import static org.mockito.Mockito.when;

@SpringBootTest
public class VehicleServiceTest {

    @MockBean
    private VehicleRepository vehicleRepository;

    @MockBean
    private CustomerRepository customerRepository;

    @Autowired
    private VehicleService vehicleService;

    @Test
    public void shouldCreateVehicle() {
        Vehicle newVehicle = new Vehicle(0, "Toyota", "Camry", 2022, 1);

        when(vehicleRepository.createVehicle(newVehicle)).thenReturn(newVehicle);
        when(customerRepository.findCustomerById(anyInt())).thenReturn(new Customer(1, "Test", "Customer", "111-111-1111", "test@customer.com", true));
        Result<Vehicle> result = vehicleService.createVehicle(newVehicle);

        assertTrue(result.isSuccess());
        assertEquals(newVehicle, result.getPayload());
    }

    @Test
    public void shouldNotCreateVehicleWithInvalidData() {
        Vehicle invalidVehicle = new Vehicle(1, "", "", 0, 0);

        Result<Vehicle> result = vehicleService.createVehicle(invalidVehicle);

        assertFalse(result.isSuccess());
        assertEquals(4, result.getMessages().size());
    }

    @Test
    public void shouldUpdateVehicle() {
        Vehicle existingVehicle = new Vehicle(1, "Toyota", "Camry", 2022, 1);

        when(customerRepository.findCustomerById(anyInt())).thenReturn(new Customer(1, "Test", "Customer", "111-111-1111", "test@customer.com", true));

        when(vehicleRepository.updateVehicle(existingVehicle)).thenReturn(true);
        Result<Vehicle> result = vehicleService.updateVehicle(existingVehicle);

        assertTrue(result.isSuccess());
    }

    @Test
    public void shouldNotUpdateNonexistentVehicle() {
        Vehicle nonExistentVehicle = new Vehicle(99, "Ford", "Focus", 2021, 2);

        when(vehicleRepository.updateVehicle(nonExistentVehicle)).thenReturn(false);
        Result<Vehicle> result = vehicleService.updateVehicle(nonExistentVehicle);

        assertFalse(result.isSuccess());
        assertEquals(1, result.getMessages().size());
    }

    @Test
    public void shouldDeleteVehicle() {
        int vehicleId = 1;

        when(vehicleRepository.deleteVehicleById(vehicleId)).thenReturn(true);
        Result<Vehicle> result = vehicleService.deleteVehicleById(vehicleId);

        assertTrue(result.isSuccess());
    }

    @Test
    public void shouldNotDeleteInvalidVehicleId() {
        int vehicleId = 99;

        when(vehicleRepository.deleteVehicleById(vehicleId)).thenReturn(false);
        Result<Vehicle> result = vehicleService.deleteVehicleById(vehicleId);

        assertFalse(result.isSuccess());
        assertEquals(1, result.getMessages().size());
    }
}
