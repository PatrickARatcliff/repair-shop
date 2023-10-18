package com.repairshop.data.mappers;

import com.repairshop.models.Appointment;
import org.springframework.jdbc.core.RowMapper;

import java.sql.ResultSet;
import java.sql.SQLException;

public class AppointmentMapper implements RowMapper<Appointment> {
    @Override
    public Appointment mapRow(ResultSet resultSet, int i) throws SQLException {
        Appointment appointment = new Appointment();
        appointment.setAppointmentId(resultSet.getInt("appointment_id"));
        appointment.setAppointmentDate(resultSet.getDate("appointment_date").toLocalDate());
        appointment.setVehicleId(resultSet.getInt("vehicle_id"));
        appointment.setUserId(resultSet.getInt("user_id"));
        return appointment;
    }
}
