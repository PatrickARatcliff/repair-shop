package com.repairshop.domain;

import com.repairshop.data.AppointmentRepository;
import com.repairshop.data.VehicleRepository;
import com.repairshop.data.UserRepository;
import com.repairshop.models.User;

import com.repairshop.models.Appointment;
import org.springframework.stereotype.Service;

import javax.validation.Validator;
import java.time.LocalDate;
import java.util.List;

@Service
public class AppointmentService {

    private final AppointmentRepository appointmentRepository;

    private final VehicleRepository vehicleRepository;

    private final UserRepository userRepository;

    private final Validator validator;

    public AppointmentService(AppointmentRepository appointmentRepository, VehicleRepository vehicleRepository, UserRepository userRepository, Validator validator) {
        this.appointmentRepository = appointmentRepository;
        this.vehicleRepository = vehicleRepository;
        this.userRepository = userRepository;
        this.validator = validator;
    }

    public List<Appointment> findAllAppointments() {
        return appointmentRepository.findAllAppointments();
    }

    public Appointment findAppointmentById(int appointmentId) {
        return appointmentRepository.findAppointmentById(appointmentId);
    }

    public List<Appointment> findAppointmentsByVehicleId(int vehicleId) {
        return appointmentRepository.findAppointmentsByVehicleId(vehicleId);
    }

    public List<Appointment> findAppointmentsByUserId(int userId) {
        return appointmentRepository.findAppointmentsByUserId(userId);
    }

    Result<Appointment> createAppointment(Appointment appointment) {
        Result<Appointment> result = validate(appointment);
        if (result.getStatus() != ActionStatus.SUCCESS) {
            return result;
        }

        Appointment inserted = appointmentRepository.createAppointment(appointment);
        if (inserted == null) {
            result.addMessage(ActionStatus.INVALID, "insert failed");
        } else {
            result.setPayload(inserted);
        }

        return result;
    }

    Result<Appointment> updateAppointment(Appointment appointment) {
        Result<Appointment> result = validate(appointment);

        if (result.getStatus() != ActionStatus.SUCCESS) {
            return result;
        }

        if (appointmentRepository.findAppointmentById(appointment.getAppointmentId()) == null) {
            result.addMessage(ActionStatus.NOT_FOUND, "Appointment ID `" + appointment.getAppointmentId() + "` not found.");
            return result;
        }

        if (!appointmentRepository.updateAppointment(appointment)) {
            result.addMessage(ActionStatus.INVALID, "Update failed.");
        }

        return result;
    }


    Result<Appointment> deleteAppointmentById(int appointmentId) {
        Result<Appointment> result = new Result<>();
        boolean deleted = appointmentRepository.deleteAppointmentById(appointmentId);
        if (!deleted) {
            result.addMessage(ActionStatus.NOT_FOUND, "Appointment ID `" + appointmentId + "` not found.");
        }
        return result;
    }

    public Result<Appointment> validate(Appointment appointment) {
        Result<Appointment> result = new Result<>();

        if (appointment == null) {
            result.addMessage(ActionStatus.INVALID, "Appointment cannot be null.");
            return result;
        }

        LocalDate appointmentDate = appointment.getAppointmentDate();
        if (appointmentDate == null) {
            result.addMessage(ActionStatus.INVALID, "Appointment date is required.");
        } else {
            LocalDate currentDate = LocalDate.now();
            if (appointmentDate.isBefore(currentDate)) {
                result.addMessage(ActionStatus.INVALID, "Appointment date cannot be in the past.");
            }
        }

        Integer vehicleId = appointment.getVehicleId();
        if (vehicleId == null) {
            result.addMessage(ActionStatus.INVALID, "Vehicle ID is required.");
        } else {
            if (vehicleRepository.findVehicleById(vehicleId) == null) {
                result.addMessage(ActionStatus.INVALID, "Vehicle with ID " + vehicleId + " does not exist.");
            }
        }

        Integer userId = appointment.getUserId();
        if (userId == null) {
            result.addMessage(ActionStatus.INVALID, "User ID is required.");
        } else {
            List<User> allUsers = userRepository.findAllUsers();
            boolean userExists = allUsers.stream().anyMatch(user -> user.getUserId() == userId);
            if (!userExists) {
                result.addMessage(ActionStatus.INVALID, "User with ID " + userId + " does not exist.");
            }
        }

        return result;
    }
}
