package com.neurofleetx.repository;

import com.neurofleetx.entity.Telemetry;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface TelemetryRepository extends JpaRepository<Telemetry, Long> {
    List<Telemetry> findByVehicleIdOrderByTimestampDesc(String vehicleId);
    
    @Query("SELECT t FROM Telemetry t WHERE t.id IN (SELECT MAX(t2.id) FROM Telemetry t2 GROUP BY t2.vehicleId)")
    List<Telemetry> findLatestForAllVehicles();
}
