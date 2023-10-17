package com.repairshop.models;

import java.sql.Date;
import java.util.Objects;

public class Appointment{
    private int appointmentId;
    private Date appointmentDate;
    private int vehicleId;
    private int userId;

    public Appointment() {
    }

    public Appointment(int appointmentId, Date appointmentDate, int vehicleId, int userId) {
        this.appointmentId = appointmentId;
        this.appointmentDate = appointmentDate;
        this.vehicleId = vehicleId;
        this.userId = userId;
    }

    public int getAppointmentId() {
        return appointmentId;
    }

    public void setAppointmentId(int appointmentId) {
        this.appointmentId = appointmentId;
    }

    public Date getAppointmentDate() {
        return appointmentDate;
    }

    public void setAppointmentDate(Date appointmentDate) {
        this.appointmentDate = appointmentDate;
    }

    public int getVehicleId() {
        return vehicleId;
    }

    public void setVehicleId(int vehicleId) {
        this.vehicleId = vehicleId;
    }

    public int getUserId() {
        return userId;
    }

    public void setUserId(int userId) {
        this.userId = userId;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Appointment that = (Appointment) o;
        return appointmentId == that.appointmentId && vehicleId == that.vehicleId && userId == that.userId && Objects.equals(appointmentDate, that.appointmentDate);
    }

    @Override
    public int hashCode() {
        return Objects.hash(appointmentId, appointmentDate, vehicleId, userId);
    }
}
