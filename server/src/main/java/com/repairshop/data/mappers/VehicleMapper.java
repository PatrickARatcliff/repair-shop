package com.repairshop.data.mappers;

import com.repairshop.models.Customer;
import com.repairshop.models.Vehicle;
import org.springframework.jdbc.core.RowMapper;

import java.sql.ResultSet;
import java.sql.SQLException;

public class VehicleMapper implements RowMapper<Vehicle> {
    @Override
    public Vehicle mapRow(ResultSet resultSet, int i) throws SQLException {
        Vehicle vehicle = new Vehicle();
        vehicle.setVehicleId(resultSet.getInt("vehicle_id"));
        vehicle.setVehicleMake(resultSet.getString("vehicle_make"));
        vehicle.setVehicleModel(resultSet.getString("vehicle_model"));
        vehicle.setVehicleYear(resultSet.getInt("vehicle_year"));
        vehicle.setCustomerId(resultSet.getInt("customer_id"));
        return vehicle;
    }
}