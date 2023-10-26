package com.repairshop.data;

import com.repairshop.models.Appointment;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

public interface AppointmentRepository {
    @Transactional
    List<Appointment> findAllAppointments();

    @Transactional
    Appointment findAppointmentById(int appointmentId);

    @Transactional
    List<Appointment> findAppointmentsByVehicleId(int vehicleId);

    @Transactional
    List<Appointment> findAppointmentsByUserId(int userId);

    @Transactional
    Appointment createAppointment(Appointment appointment);

    @Transactional
    boolean updateAppointment(Appointment appointment);

    @Transactional
    boolean deleteAppointmentById(int appointmentId);
}
