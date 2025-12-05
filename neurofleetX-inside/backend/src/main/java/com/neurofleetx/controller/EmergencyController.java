package com.neurofleetx.controller;

import com.neurofleetx.entity.EmergencyAlert;
import com.neurofleetx.repository.EmergencyAlertRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/emergency")
@RequiredArgsConstructor
public class EmergencyController {
    
    private final EmergencyAlertRepository emergencyAlertRepository;
    
    @GetMapping("/alerts")
    public ResponseEntity<List<EmergencyAlert>> getAlerts() {
        return ResponseEntity.ok(emergencyAlertRepository.findAll());
    }
    
    @GetMapping("/alerts/active")
    public ResponseEntity<List<EmergencyAlert>> getActiveAlerts() {
        return ResponseEntity.ok(emergencyAlertRepository.findByStatus(EmergencyAlert.AlertStatus.active));
    }
    
    @GetMapping("/routes")
    public ResponseEntity<List<Map<String, Object>>> getRoutes() {
        // Return sample emergency routes for Hyderabad
        return ResponseEntity.ok(List.of(
                Map.of(
                        "id", "route-1",
                        "type", "ambulance",
                        "origin", Map.of("lat", 17.4065, "lng", 78.4772),
                        "destination", Map.of("lat", 17.4156, "lng", 78.4347),
                        "waypoints", List.of()
                ),
                Map.of(
                        "id", "route-2",
                        "type", "fire_truck",
                        "origin", Map.of("lat", 17.3850, "lng", 78.4867),
                        "destination", Map.of("lat", 17.4399, "lng", 78.4983),
                        "waypoints", List.of()
                )
        ));
    }
}
