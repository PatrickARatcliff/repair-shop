package com.repairshop.models;

import java.util.Objects;

public class Vehicle {
    private int vehicleId;
    private String vehicleMake;
    private String vehicleModel;
    private int vehicleYear;
    private int customerId;

    public Vehicle() {
    }

    public Vehicle(int vehicleId, String vehicleMake, String vehicleModel, int vehicleYear, int customerId) {
        this.vehicleId = vehicleId;
        this.vehicleMake = vehicleMake;
        this.vehicleModel = vehicleModel;
        this.vehicleYear = vehicleYear;
        this.customerId = customerId;
    }

    public int getVehicleId() {
        return vehicleId;
    }

    public void setVehicleId(int vehicleId) {
        this.vehicleId = vehicleId;
    }

    public String getVehicleMake() {
        return vehicleMake;
    }

    public void setVehicleMake(String vehicleMake) {
        this.vehicleMake = vehicleMake;
    }

    public String getVehicleModel() {
        return vehicleModel;
    }

    public void setVehicleModel(String vehicleModel) {
        this.vehicleModel = vehicleModel;
    }

    public int getVehicleYear() {
        return vehicleYear;
    }

    public void setVehicleYear(int vehicleYear) {
        this.vehicleYear = vehicleYear;
    }

    public int getCustomerId() {
        return customerId;
    }

    public void setCustomerId(int customerId) {
        this.customerId = customerId;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Vehicle vehicle = (Vehicle) o;
        return vehicleId == vehicle.vehicleId && vehicleYear == vehicle.vehicleYear && customerId == vehicle.customerId && Objects.equals(vehicleMake, vehicle.vehicleMake) && Objects.equals(vehicleModel, vehicle.vehicleModel);
    }

    @Override
    public int hashCode() {
        return Objects.hash(vehicleId, vehicleMake, vehicleModel, vehicleYear, customerId);
    }
}
