package com.repairshop.data;

import com.repairshop.models.Vehicle;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.jdbc.core.JdbcTemplate;

import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
class VehicleJdbcTemplateRepositoryTest {

    @Autowired
    JdbcTemplate jdbcTemplate;

    @Autowired
    VehicleJdbcTemplateRepository repository;

    static boolean hasRun = false;

    @BeforeEach
    void setup() {
        if (!hasRun) {
            jdbcTemplate.update("call set_known_good_state();");
            hasRun = true;
        }
    }

    @Test
    void shouldFindAllVehicles() {
        List<Vehicle> actual = repository.findAllVehicles();
        assertTrue(actual.size() > 1 && actual.size() < 5);
    }

    @Test
    void shouldFindCamryById() {
        Vehicle actual = repository.findVehicleById(1);

        assertEquals("Camry", actual.getVehicleModel());
        assertEquals(1, actual.getVehicleId());
    }

    @Test
    void shouldFindF150ByCustomerTwoId() {
        List<Vehicle> actual = repository.findVehiclesByCustomerId(2);

        assertEquals("F-150", actual.get(0).getVehicleModel());
    }

    @Test
    void shouldCreateTestVehicle() {
        Vehicle vehicle = new Vehicle(0, "Test", "Vehicle", 2023, 1);

        Vehicle actual = repository.createVehicle(vehicle);

        assertEquals(4, actual.getVehicleId());

        Vehicle test = repository.findVehicleById(4);

        assertEquals("Vehicle", test.getVehicleModel());
    }

    @Test
    void shouldUpdateToyotaCamryUserId() {
        Vehicle vehicle = repository.findVehicleById(1);
        vehicle.setCustomerId(3);

        assertTrue(repository.updateVehicle(vehicle));

        Vehicle updatedCamry = repository.findVehicleById(1);
        assertEquals(3, updatedCamry.getCustomerId());
    }

    @Test
    void shouldDeleteCivicById() {
        assertTrue(repository.deleteVehicleById(3));

        assertNull(repository.findVehicleById(3));
    }
}