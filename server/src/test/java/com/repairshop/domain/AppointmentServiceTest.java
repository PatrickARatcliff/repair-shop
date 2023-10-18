package com.repairshop.domain;

import com.repairshop.data.AppointmentRepository;
import com.repairshop.data.VehicleRepository;
import com.repairshop.data.UserRepository;
import com.repairshop.models.User;
import com.repairshop.models.Appointment;
import com.repairshop.models.Vehicle;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;

import java.time.LocalDate;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.when;

@SpringBootTest
class AppointmentServiceTest {

    @MockBean
    private AppointmentRepository appointmentRepository;

    @MockBean
    private VehicleRepository vehicleRepository;

    @MockBean
    private UserRepository userRepository;

    @Autowired
    private AppointmentService appointmentService;

    @Test
    void shouldFindAllAppointments() {
        List<Appointment> expected = List.of(
                new Appointment(1, LocalDate.now(), 1, 1),
                new Appointment(2, LocalDate.now(), 2, 2),
                new Appointment(3, LocalDate.now(), 3, 3)
        );

        when(appointmentRepository.findAllAppointments()).thenReturn(expected);

        List<Appointment> actual = appointmentService.findAllAppointments();

        assertEquals(expected, actual);
    }

    @Test
    void shouldFindAppointmentById() {
        Appointment expected = new Appointment(1, LocalDate.now(), 1, 1);
        when(appointmentRepository.findAppointmentById(1)).thenReturn(expected);

        Appointment actual = appointmentService.findAppointmentById(1);
        assertEquals(expected, actual);
    }

    @Test
    void shouldNotFindByInvalidId() {
        when(appointmentRepository.findAppointmentById(99)).thenReturn(null);
        Appointment actual = appointmentService.findAppointmentById(99);
        assertNull(actual);
    }

    @Test
    void shouldCreateAppointment() {
        Appointment newAppointment = new Appointment(0, LocalDate.now().plusDays(1), 1, 1);
        when(vehicleRepository.findVehicleById(1)).thenReturn(new Vehicle(1, "Toyota", "Camry", 2022, 1));
        when(userRepository.findAllUsers()).thenReturn(List.of(new User(1, "testUserName", "testPassword", true, List.of("USER"))));
        when(appointmentRepository.createAppointment(newAppointment)).thenReturn(newAppointment);

        Result<Appointment> result = appointmentService.createAppointment(newAppointment);

        assertTrue(result.isSuccess());
        assertEquals(newAppointment, result.getPayload());
    }

    @Test
    void shouldNotCreateInvalid() {
        Appointment newAppointment = new Appointment(0, LocalDate.now().plusDays(1), 1, 1);
        when(vehicleRepository.findVehicleById(1)).thenReturn(new Vehicle(1, "Toyota", "Camry", 2022, 1));
        when(userRepository.findAllUsers()).thenReturn(List.of(new User(1, "testUserName", "testPassword", true, List.of("USER"))));
        when(appointmentRepository.createAppointment(newAppointment)).thenReturn(newAppointment);

        newAppointment.setUserId(99);
        Result<Appointment> result = appointmentService.createAppointment(newAppointment);
        assertFalse(result.isSuccess());
        assertEquals(1, result.getMessages().size());

        newAppointment.setUserId(1);
        newAppointment.setVehicleId(99);
        result = appointmentService.createAppointment(newAppointment);
        assertFalse(result.isSuccess());
        assertEquals(1, result.getMessages().size());

        newAppointment.setVehicleId(1);
        newAppointment.setAppointmentDate(LocalDate.now().minusDays(1));
        result = appointmentService.createAppointment(newAppointment);
        assertFalse(result.isSuccess());
        assertEquals(1, result.getMessages().size());
    }

    @Test
    void shouldUpdateAppointment() {
        Appointment existingAppointment = new Appointment(1, LocalDate.now().plusDays(1), 1, 1);
        when(vehicleRepository.findVehicleById(1)).thenReturn(new Vehicle(1, "Toyota", "Camry", 2022, 1));
        when(userRepository.findAllUsers()).thenReturn(List.of(new User(1, "testUserName", "testPassword", true, List.of("USER"))));
        when(appointmentRepository.findAppointmentById(existingAppointment.getAppointmentId())).thenReturn(new Appointment(1, LocalDate.now().plusDays(1), 1, 1));
        when(appointmentRepository.updateAppointment(existingAppointment)).thenReturn(true);

        Result<Appointment> result = appointmentService.updateAppointment(existingAppointment);
        assertTrue(result.isSuccess());
    }

    @Test
    void shouldNotUpdateInvalidAppointmentId() {
        Appointment existingAppointment = new Appointment(1, LocalDate.now().plusDays(1), 1, 1);
        when(vehicleRepository.findVehicleById(1)).thenReturn(new Vehicle(1, "Toyota", "Camry", 2022, 1));
        when(userRepository.findAllUsers()).thenReturn(List.of(new User(1, "testUserName", "testPassword", true, List.of("USER"))));
        when(appointmentRepository.findAppointmentById(existingAppointment.getAppointmentId())).thenReturn(null);
        when(appointmentRepository.updateAppointment(existingAppointment)).thenReturn(true);

        existingAppointment.setAppointmentId(99);
        Result<Appointment> result = appointmentService.updateAppointment(existingAppointment);
        assertFalse(result.isSuccess());
        assertEquals(1, result.getMessages().size());
    }

    @Test
    void shouldDeleteAppointmentById() {
        when(appointmentRepository.deleteAppointmentById(1)).thenReturn(true);

        Result<Appointment> result = appointmentService.deleteAppointmentById(1);
        assertTrue(result.isSuccess());
    }

    @Test
    void shouldNotDeleteAppointmentById() {
        when(appointmentRepository.deleteAppointmentById(99)).thenReturn(false);

        Result<Appointment> result = appointmentService.deleteAppointmentById(99);
        assertFalse(result.isSuccess());
        assertEquals(1, result.getMessages().size());
    }
}

