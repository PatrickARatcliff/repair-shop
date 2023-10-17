package com.repairshop.data;

import com.repairshop.models.Vehicle;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

public interface VehicleRepository {
    @Transactional
    List<Vehicle> findAllVehicles();

    @Transactional
    Vehicle findVehicleById(int vehicleId);

    @Transactional
    List<Vehicle> findVehiclesByCustomerId(int customerId);

    @Transactional
    Vehicle createVehicle(Vehicle vehicle);

    @Transactional
    boolean updateVehicle(Vehicle vehicle);

    @Transactional
    boolean deleteVehicleById(int vehicleId);
}
