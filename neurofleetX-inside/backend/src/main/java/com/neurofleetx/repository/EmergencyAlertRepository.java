package com.neurofleetx.repository;

import com.neurofleetx.entity.EmergencyAlert;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface EmergencyAlertRepository extends JpaRepository<EmergencyAlert, String> {
    List<EmergencyAlert> findByStatus(EmergencyAlert.AlertStatus status);
    List<EmergencyAlert> findBySeverity(EmergencyAlert.Severity severity);
}
