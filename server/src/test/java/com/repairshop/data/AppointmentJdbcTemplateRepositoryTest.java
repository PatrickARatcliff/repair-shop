package com.repairshop.data;

import com.repairshop.models.Appointment;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.jdbc.core.JdbcTemplate;

import java.time.LocalDate;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
class AppointmentJdbcTemplateRepositoryTest {

    @Autowired
    JdbcTemplate jdbcTemplate;

    @Autowired
    AppointmentJdbcTemplateRepository repository;

    static boolean hasRun = false;

    @BeforeEach
    void setup() {
        if (!hasRun) {
            jdbcTemplate.update("call set_known_good_state();");
            hasRun = true;
        }
    }

    @Test
    void shouldFindAllAppointments() {
        List<Appointment> actual = repository.findAllAppointments();
        assertTrue(actual.size() > 2 && actual.size() < 6);
    }

    @Test
    void shouldFindAppointmentById() {
        Appointment actual = repository.findAppointmentById(1);

        assertEquals(LocalDate.of(2023, 10, 20), actual.getAppointmentDate());
        assertEquals(1, actual.getAppointmentId());
    }

    @Test
    void shouldFindAppointmentsByVehicleId() {
        List<Appointment> actual = repository.findAppointmentsByVehicleId(1);

        assertTrue(actual.size() > 0 && actual.size() < 4);
        assertEquals(LocalDate.of(2023, 10, 20), actual.get(0).getAppointmentDate());
    }

    @Test
    void shouldFindAppointmentsByUserId() {
        List<Appointment> actual = repository.findAppointmentsByUserId(1);

        assertTrue(actual.size() > 0 && actual.size() < 4);
        assertEquals(LocalDate.of(2023, 10, 20), actual.get(0).getAppointmentDate());
    }

    @Test
    void shouldCreateAppointment() {
        Appointment appointment = new Appointment(0, LocalDate.of(2023, 12, 31), 2, 1);

        Appointment actual = repository.createAppointment(appointment);

        assertEquals(5, actual.getAppointmentId());

        Appointment test = repository.findAppointmentById(5);

        assertEquals(LocalDate.of(2023, 12, 31), test.getAppointmentDate());
    }

    @Test
    void shouldUpdateAppointment() {
        Appointment appointment = repository.findAppointmentById(2);
        appointment.setAppointmentDate(LocalDate.of(2024, 1, 1));

        assertTrue(repository.updateAppointment(appointment));

        Appointment updatedAppointment = repository.findAppointmentById(2);
        assertEquals(LocalDate.of(2024, 1, 1), updatedAppointment.getAppointmentDate());
    }

    @Test
    void shouldDeleteAppointmentById() {
        assertTrue(repository.deleteAppointmentById(4));

        assertNull(repository.findAppointmentById(4));
    }
}