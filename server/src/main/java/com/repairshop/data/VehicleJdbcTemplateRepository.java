package com.repairshop.data;

import com.repairshop.data.mappers.VehicleMapper;
import com.repairshop.models.Vehicle;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.support.GeneratedKeyHolder;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.sql.PreparedStatement;
import java.sql.Statement;
import java.util.List;

@Repository
public class VehicleJdbcTemplateRepository implements VehicleRepository {
    private final JdbcTemplate jdbcTemplate;

    public VehicleJdbcTemplateRepository(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    @Override
    @Transactional
    public List<Vehicle> findAllVehicles() {

        final String sql = "select vehicle_id, vehicle_make, vehicle_model, vehicle_year, customer_id "
                + "from vehicle;";

        return jdbcTemplate.query(sql, new VehicleMapper());
    }

    @Override
    @Transactional
    public Vehicle findVehicleById(int vehicleId) {

        final String sql = "select vehicle_id, vehicle_make, vehicle_model, vehicle_year, customer_id "
                + "from vehicle "
                + "where vehicle_id = ?;";

        return jdbcTemplate.query(sql, new VehicleMapper(), vehicleId)
                .stream()
                .findFirst().orElse(null);
    }

    @Override
    @Transactional
    public List<Vehicle> findVehiclesByCustomerId(int customerId) {

        final String sql = "select vehicle_id, vehicle_make, vehicle_model, vehicle_year, customer_id "
                + "from vehicle "
                + "where customer_id = ?;";

        return jdbcTemplate.query(sql, new VehicleMapper(), customerId);
    }

    @Override
    @Transactional
    public Vehicle createVehicle(Vehicle vehicle) {

        final String sql = "insert into vehicle (vehicle_make, vehicle_model, vehicle_year, customer_id) values (?, ?, ?, ?);";

        GeneratedKeyHolder keyHolder = new GeneratedKeyHolder();
        int rowsAffected = jdbcTemplate.update(connection -> {
            PreparedStatement ps = connection.prepareStatement(sql, Statement.RETURN_GENERATED_KEYS);
            ps.setString(1, vehicle.getVehicleMake());
            ps.setString(2, vehicle.getVehicleModel());
            ps.setInt(3, vehicle.getVehicleYear());
            ps.setInt(4, vehicle.getCustomerId());
            return ps;
        }, keyHolder);

        if (rowsAffected <= 0) {
            return null;
        }

        vehicle.setVehicleId(keyHolder.getKey().intValue());

        return vehicle;
    }

    @Override
    @Transactional
    public boolean updateVehicle(Vehicle vehicle) {

        final String sql = "update vehicle set "
                + "vehicle_make = ?, "
                + "vehicle_model = ?, "
                + "vehicle_year = ?, "
                + "customer_id = ? "
                + "where vehicle_id = ?";

        boolean updated = jdbcTemplate.update(sql,
                vehicle.getVehicleMake(), vehicle.getVehicleModel(), vehicle.getVehicleYear(), vehicle.getCustomerId(), vehicle.getVehicleId()) > 0;

        return updated;
    }

    @Override
    @Transactional
    public boolean deleteVehicleById(int vehicleId) {
        final String deleteAppointmentsSQL = "delete from appointment where vehicle_id = ?";
        jdbcTemplate.update(deleteAppointmentsSQL, vehicleId);

        final String sql = "delete from vehicle where vehicle_id = ?";
        return jdbcTemplate.update(sql, vehicleId) > 0;
    }
}

