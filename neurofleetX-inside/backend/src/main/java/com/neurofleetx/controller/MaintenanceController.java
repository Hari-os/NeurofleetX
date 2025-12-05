package com.neurofleetx.controller;

import com.neurofleetx.entity.Maintenance;
import com.neurofleetx.repository.MaintenanceRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/maintenance")
@RequiredArgsConstructor
public class MaintenanceController {
    
    private final MaintenanceRepository maintenanceRepository;
    
    @GetMapping
    public ResponseEntity<List<Maintenance>> getAllMaintenance() {
        return ResponseEntity.ok(maintenanceRepository.findAll());
    }
    
    @GetMapping("/vehicle/{vehicleId}")
    public ResponseEntity<List<Maintenance>> getMaintenanceByVehicle(@PathVariable String vehicleId) {
        return ResponseEntity.ok(maintenanceRepository.findByVehicleId(vehicleId));
    }
    
    @GetMapping("/predict")
    public ResponseEntity<Map<String, Object>> getPredictiveMaintenance() {
        return ResponseEntity.ok(Map.of(
                "predictions", List.of(
                        Map.of(
                                "vehicleId", "VH-001",
                                "component", "brakes",
                                "predictedFailure", "2024-02-15",
                                "confidence", 87,
                                "recommendation", "Schedule brake pad replacement"
                        ),
                        Map.of(
                                "vehicleId", "VH-003",
                                "component", "engine",
                                "predictedFailure", "2024-02-20",
                                "confidence", 72,
                                "recommendation", "Oil change recommended"
                        )
                ),
                "fleetHealthScore", 89,
                "totalPredictions", 12,
                "highPriorityCount", 3
        ));
    }
}
