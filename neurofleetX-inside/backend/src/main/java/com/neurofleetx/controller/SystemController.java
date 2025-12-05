package com.neurofleetx.controller;

import com.neurofleetx.dto.SystemHealthDTO;
import com.neurofleetx.entity.SystemHealth;
import com.neurofleetx.repository.SystemHealthRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.Map;

@RestController
@RequestMapping("/api/system")
@RequiredArgsConstructor
public class SystemController {
    
    private final SystemHealthRepository systemHealthRepository;
    
    @GetMapping("/health")
    public ResponseEntity<SystemHealthDTO> getHealth() {
        SystemHealth health = systemHealthRepository.findLatest()
                .orElse(getDefaultHealth());
        
        return ResponseEntity.ok(SystemHealthDTO.builder()
                .uptime(health.getUptime())
                .responseTime(health.getResponseTime())
                .dataProcessingSpeed(health.getDataProcessingSpeed())
                .networkStatus(health.getNetworkStatus().name())
                .processingThroughput(health.getProcessingThroughput())
                .cpuUsage(health.getCpuUsage())
                .memoryUsage(health.getMemoryUsage())
                .build());
    }
    
    @GetMapping("/traffic/analysis")
    public ResponseEntity<Map<String, Object>> getTrafficAnalysis() {
        return ResponseEntity.ok(Map.of(
                "peakType", "morning",
                "avgTravelTime", 28,
                "baseSpeed", 45,
                "congestionLevel", 35,
                "optimizedRoutes", 156
        ));
    }
    
    private SystemHealth getDefaultHealth() {
        return SystemHealth.builder()
                .uptime(99.97)
                .responseTime(45)
                .dataProcessingSpeed(1250)
                .networkStatus(SystemHealth.NetworkStatus.optimal)
                .processingThroughput(98)
                .cpuUsage(42)
                .memoryUsage(68)
                .build();
    }
}
