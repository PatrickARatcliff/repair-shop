package com.repairshop.data;

import com.repairshop.data.mappers.AppointmentMapper;
import com.repairshop.models.Appointment;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.support.GeneratedKeyHolder;
import org.springframework.transaction.annotation.Transactional;

import java.sql.PreparedStatement;
import java.sql.Statement;
import java.util.List;

public class AppointmentJdbcTemplateRepository implements AppointmentRepository {
    private final JdbcTemplate jdbcTemplate;

    public AppointmentJdbcTemplateRepository(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    @Override
    @Transactional
    public List<Appointment> findAllAppointments() {

        final String sql = "select appointment_id, appointment_date, vehicle_id, user_id"
                + "from appointment;";

        return jdbcTemplate.query(sql, new AppointmentMapper());
    }

    @Override
    @Transactional
    public Appointment findAppointmentById(int appointmentId) {

        final String sql = "select appointment_id, appointment_date, vehicle_id, user_id"
                + "from appointment "
                + "where appointment_id = ?;";

        return jdbcTemplate.query(sql, new AppointmentMapper(), appointmentId)
                .stream()
                .findFirst().orElse(null);
    }

    @Override
    @Transactional
    public List<Appointment> findAppointmentsByVehicleId(int vehicleId) {

        final String sql = "select appointment_id, appointment_date, vehicle_id, user_id"
                + "from appointment "
                + "where vehicle_id = ?;";

        return jdbcTemplate.query(sql, new AppointmentMapper(), vehicleId);
    }

    @Override
    @Transactional
    public List<Appointment> findAppointmentsByUserId(int userId) {

        final String sql = "select appointment_id, appointment_date, vehicle_id, user_id"
                + "from appointment "
                + "where user_id = ?;";

        return jdbcTemplate.query(sql, new AppointmentMapper(), userId);
    }

    @Override
    @Transactional
    public Appointment createAppointment(Appointment appointment) {

        final String sql = "insert into appointment (appointment_date, vehicle_id, user_id) values (?, ?, ?);";

        GeneratedKeyHolder keyHolder = new GeneratedKeyHolder();
        int rowsAffected = jdbcTemplate.update(connection -> {
            PreparedStatement ps = connection.prepareStatement(sql, Statement.RETURN_GENERATED_KEYS);
            ps.setDate(1, appointment.getAppointmentDate());
            ps.setInt(2, appointment.getVehicleId());
            ps.setInt(3, appointment.getUserId());
            return ps;
        }, keyHolder);

        if (rowsAffected <= 0) {
            return null;
        }

        appointment.setAppointmentId(keyHolder.getKey().intValue());

        return appointment;
    }

    @Override
    @Transactional
    public boolean updateAppointment(Appointment appointment) {

        final String sql = "update appointment set "
                + "appointment_date = ?, "
                + "vehicle_id = ?, "
                + "user_id = ? "
                + "where appointment_id = ?";

        boolean updated = jdbcTemplate.update(sql,
                appointment.getAppointmentDate(), appointment.getVehicleId(), appointment.getUserId(), appointment.getAppointmentId()) > 0;

        return updated;
    }

    @Override
    @Transactional
    public boolean deleteAppointmentById(int appointmentId) {
        final String sql = "delete from appointment where appointment_id = ?";
        return jdbcTemplate.update(sql, appointmentId) > 0;
    }
}

