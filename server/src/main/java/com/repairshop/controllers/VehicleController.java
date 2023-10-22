package com.repairshop.controllers;

import com.repairshop.domain.VehicleService;
import com.repairshop.domain.Result;
import com.repairshop.models.Vehicle;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = {"http://localhost:3000"})
@RequestMapping("/vehicle")
public class VehicleController {

    private final VehicleService service;

    public VehicleController(VehicleService service) {
        this.service = service;
    }

    @GetMapping
    public List<Vehicle> findAllVehicles() {
        return service.findAllVehicles();
    }

    @GetMapping("/{vehicleId}")
    public ResponseEntity<Vehicle> findVehicleById(@PathVariable int vehicleId) {
        Vehicle vehicle = service.findVehicleById(vehicleId);
        if (vehicle == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(vehicle);
    }

    @GetMapping("/customer/{customerId}")
    public ResponseEntity<List<Vehicle>> findVehiclesByCustomerId(@PathVariable int customerId) {
        List<Vehicle> vehicles = service.findVehiclesByCustomerId(customerId);
        if (vehicles == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(vehicles);
    }

    @PostMapping
    public ResponseEntity<Vehicle> createVehicle(@RequestBody Vehicle vehicle) {
        Result<Vehicle> result = service.createVehicle(vehicle);
        return new ResponseEntity<>(result.getPayload(), getStatus(result, HttpStatus.CREATED));
    }

    @PutMapping("/{vehicleId}")
    public ResponseEntity<Void> updateVehicle(@PathVariable int vehicleId, @RequestBody Vehicle vehicle) {
        if (vehicle != null && vehicle.getVehicleId() != vehicleId) {
            return new ResponseEntity<>(HttpStatus.CONFLICT);
        }
        Result<Vehicle> result = service.updateVehicle(vehicle);
        return new ResponseEntity<>(getStatus(result, HttpStatus.NO_CONTENT));
    }

    @DeleteMapping("/{vehicleId}")
    public ResponseEntity<Void> deleteVehicle(@PathVariable int vehicleId) {
        Result<Vehicle> result = service.deleteVehicleById(vehicleId);
        return new ResponseEntity<>(getStatus(result, HttpStatus.NO_CONTENT));
    }

    private HttpStatus getStatus(Result<Vehicle> result, HttpStatus statusDefault) {
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
