package com.neurofleetx.controller;

import com.neurofleetx.entity.Telemetry;
import com.neurofleetx.repository.TelemetryRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/telemetry")
@RequiredArgsConstructor
public class TelemetryController {
    
    private final TelemetryRepository telemetryRepository;
    
    @GetMapping("/live")
    public ResponseEntity<List<Telemetry>> getLiveTelemetry(@RequestParam(required = false) String city) {
        return ResponseEntity.ok(telemetryRepository.findLatestForAllVehicles());
    }
    
    @GetMapping("/vehicle/{vehicleId}")
    public ResponseEntity<List<Telemetry>> getVehicleTelemetry(@PathVariable String vehicleId) {
        return ResponseEntity.ok(telemetryRepository.findByVehicleIdOrderByTimestampDesc(vehicleId));
    }
}
