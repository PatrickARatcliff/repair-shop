package com.repairshop.models;

import java.util.Date;
import java.util.Objects;

public class Appointment{
    private int appointmentId;
    private Date appointmentDate;
    private int vehicleId;

    public Appointment() {
    }

    public Appointment(int appointmentId, Date appointmentDate, int vehicleId) {
        this.appointmentId = appointmentId;
        this.appointmentDate = appointmentDate;
        this.vehicleId = vehicleId;
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

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Appointment that = (Appointment) o;
        return appointmentId == that.appointmentId && vehicleId == that.vehicleId && Objects.equals(appointmentDate, that.appointmentDate);
    }

    @Override
    public int hashCode() {
        return Objects.hash(appointmentId, appointmentDate, vehicleId);
    }
}
