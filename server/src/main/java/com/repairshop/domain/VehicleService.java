package com.repairshop.domain;

import com.repairshop.data.CustomerRepository;
import com.repairshop.data.VehicleRepository;
import com.repairshop.models.Customer;
import com.repairshop.models.Vehicle;
import org.springframework.stereotype.Service;

import javax.validation.Validator;
import java.time.Year;
import java.util.List;

@Service
public class VehicleService {

    private final VehicleRepository vehicleRepository;

    private final CustomerRepository customerRepository;

    private final Validator validator;

    public VehicleService(VehicleRepository vehicleRepository, CustomerRepository customerRepository, Validator validator) {
        this.vehicleRepository = vehicleRepository;
        this.customerRepository = customerRepository;
        this.validator = validator;
    }

    public List<Vehicle> findAllVehicles() {
        return vehicleRepository.findAllVehicles();
    }

    public Vehicle findVehicleById(int vehicleId) {
        return vehicleRepository.findVehicleById(vehicleId);
    }

    public List<Vehicle> findVehiclesByCustomerId(int customerId) {
        return vehicleRepository.findVehiclesByCustomerId(customerId);
    }

    public Result<Vehicle> createVehicle(Vehicle vehicle) {
        Result<Vehicle> result = validate(vehicle);
        if (result.getStatus() != ActionStatus.SUCCESS) {
            return result;
        }

        if (vehicle.getVehicleId() != 0) {
            result.addMessage(ActionStatus.INVALID, "Cannot create vehicle with existing ID.");
        }

        Vehicle inserted = vehicleRepository.createVehicle(vehicle);
        if (inserted == null) {
            result.addMessage(ActionStatus.INVALID, "insert failed");
        } else {
            result.setPayload(inserted);
        }

        return result;
    }

    public Result<Vehicle> updateVehicle(Vehicle vehicle) {
        Result<Vehicle> result = validate(vehicle);
        if (result.getStatus() != ActionStatus.SUCCESS) {
            return result;
        }

        if (!vehicleRepository.updateVehicle(vehicle)) {
            result.addMessage(ActionStatus.NOT_FOUND, "Vehicle ID `" + vehicle.getVehicleId() + "` not found.");
        }

        return result;
    }

    public Result<Vehicle> deleteVehicleById(int vehicleId) {
        Result<Vehicle> result = new Result<>();
        boolean deleted = vehicleRepository.deleteVehicleById(vehicleId);
        if (!deleted) {
            result.addMessage(ActionStatus.NOT_FOUND, "Vehicle ID `" + vehicleId + "` not found.");
        }
        return result;
    }

    private Result<Vehicle> validate(Vehicle vehicle) {
        Result<Vehicle> result = new Result<>();

        if (vehicle == null) {
            result.addMessage(ActionStatus.INVALID, "Vehicle cannot be null.");
            return result;
        }

        if (vehicle.getVehicleMake() == null || vehicle.getVehicleMake().isEmpty()) {
            result.addMessage(ActionStatus.INVALID, "Vehicle make is required.");
        }

        if (vehicle.getVehicleModel() == null || vehicle.getVehicleModel().isEmpty()) {
            result.addMessage(ActionStatus.INVALID, "Vehicle model is required.");
        }

        if (vehicle.getVehicleYear() <= 0) {
            result.addMessage(ActionStatus.INVALID, "Vehicle year is required and must be greater than zero.");
        } else {
            int currentYear = Year.now().getValue();
            int maxAllowedYear = currentYear + 1;

            if (vehicle.getVehicleYear() > maxAllowedYear) {
                result.addMessage(ActionStatus.INVALID, "Vehicle year cannot be more than one year in the future.");
            }
        }

        if (vehicle.getCustomerId() < 1) {
            result.addMessage(ActionStatus.INVALID, "Customer ID is required.");
        } else {
            Customer customer = customerRepository.findCustomerById(vehicle.getCustomerId());
            if (customer == null) {
                result.addMessage(ActionStatus.INVALID, "Customer with ID " + vehicle.getCustomerId() + " does not exist.");
            }
        }
        return result;
    }
}
