package com.neurofleetx.repository;

import com.neurofleetx.entity.Vehicle;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface VehicleRepository extends JpaRepository<Vehicle, String> {
    List<Vehicle> findByStatus(Vehicle.VehicleStatus status);
    List<Vehicle> findByDriverId(String driverId);
    
    @Query("SELECT COUNT(v) FROM Vehicle v WHERE v.status = :status")
    long countByStatus(Vehicle.VehicleStatus status);
    
    @Query("SELECT AVG(v.health) FROM Vehicle v")
    Double getAverageHealth();
    
    @Query("SELECT AVG(v.fuel) FROM Vehicle v")
    Double getAverageFuel();
}
