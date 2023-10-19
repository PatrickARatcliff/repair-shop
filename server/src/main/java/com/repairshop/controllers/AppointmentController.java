package com.repairshop.controllers;

import com.repairshop.domain.AppointmentService;
import com.repairshop.domain.Result;
import com.repairshop.models.Appointment;
import com.repairshop.models.Vehicle;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = {"http://localhost:3000"})
@RequestMapping("/appointment")
public class AppointmentController {

    private final AppointmentService service;

    public AppointmentController(AppointmentService service) {
        this.service = service;
    }

    @GetMapping
    public List<Appointment> findAllAppointments() {
        return service.findAllAppointments();
    }

    @GetMapping("/{appointmentId}")
    public ResponseEntity<Appointment> findAppointmentById(@PathVariable int appointmentId) {
        Appointment appointment = service.findAppointmentById(appointmentId);
        if (appointment == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(appointment);
    }

    @GetMapping("/vehicle/{vehicleId}")
    public ResponseEntity<List<Appointment>> findAppointmentsByVehicleId(@PathVariable int vehicleId) {
        List<Appointment> appointments = service.findAppointmentsByVehicleId(vehicleId);
        if (appointments == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(appointments);
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<List<Appointment>> findAppointmentsByUserId(@PathVariable int userId) {
        List<Appointment> appointments = service.findAppointmentsByUserId(userId);
        if (appointments == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(appointments);
    }

    @PostMapping
    public ResponseEntity<Appointment> createAppointment(@RequestBody Appointment appointment) {
        Result<Appointment> result = service.createAppointment(appointment);
        return new ResponseEntity<>(result.getPayload(), getStatus(result, HttpStatus.CREATED));
    }

    @PutMapping("/{appointmentId}")
    public ResponseEntity<Void> updateAppointment(@PathVariable int appointmentId, @RequestBody Appointment appointment) {
        if (appointment != null && appointment.getAppointmentId() != appointmentId) {
            return new ResponseEntity<>(HttpStatus.CONFLICT);
        }
        Result<Appointment> result = service.updateAppointment(appointment);
        return new ResponseEntity<>(getStatus(result, HttpStatus.NO_CONTENT));
    }

    @DeleteMapping("/{appointmentId}")
    public ResponseEntity<Void> deleteVehicle(@PathVariable int appointmentId) {
        Result<Appointment> result = service.deleteAppointmentById(appointmentId);
        return new ResponseEntity<>(getStatus(result, HttpStatus.NO_CONTENT));
    }

    private HttpStatus getStatus(Result<Appointment> result, HttpStatus statusDefault) {
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
