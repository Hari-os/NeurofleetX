package com.neurofleetx.repository;

import com.neurofleetx.entity.Maintenance;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface MaintenanceRepository extends JpaRepository<Maintenance, String> {
    List<Maintenance> findByVehicleId(String vehicleId);
    List<Maintenance> findByStatus(Maintenance.MaintenanceStatus status);
    List<Maintenance> findByType(Maintenance.MaintenanceType type);
}
