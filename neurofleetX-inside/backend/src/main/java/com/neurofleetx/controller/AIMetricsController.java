package com.neurofleetx.controller;

import com.neurofleetx.dto.AIMetricsDTO;
import com.neurofleetx.entity.AIMetrics;
import com.neurofleetx.repository.AIMetricsRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/ai")
@RequiredArgsConstructor
public class AIMetricsController {
    
    private final AIMetricsRepository aiMetricsRepository;
    
    @GetMapping("/metrics")
    public ResponseEntity<AIMetricsDTO> getMetrics() {
        AIMetrics metrics = aiMetricsRepository.findLatest()
                .orElse(getDefaultMetrics());
        
        return ResponseEntity.ok(AIMetricsDTO.builder()
                .fleetOptimizationScore(metrics.getFleetOptimizationScore())
                .trafficFlowEfficiency(metrics.getTrafficFlowEfficiency())
                .signalTimingOptimization(metrics.getSignalTimingOptimization())
                .congestionReduction(metrics.getCongestionReduction())
                .emergencyResponseTime(metrics.getEmergencyResponseTime())
                .tropicalOptimization(AIMetricsDTO.TropicalOptimizationDTO.builder()
                        .status(metrics.getTropicalStatus())
                        .patternRecognition(metrics.getPatternRecognition())
                        .routeOptimization(metrics.getRouteOptimization())
                        .predictionAnalysis(metrics.getPredictionAnalysis())
                        .build())
                .build());
    }
    
    @GetMapping("/tropical")
    public ResponseEntity<AIMetricsDTO.TropicalOptimizationDTO> getTropical() {
        AIMetrics metrics = aiMetricsRepository.findLatest()
                .orElse(getDefaultMetrics());
        
        return ResponseEntity.ok(AIMetricsDTO.TropicalOptimizationDTO.builder()
                .status(metrics.getTropicalStatus())
                .patternRecognition(metrics.getPatternRecognition())
                .routeOptimization(metrics.getRouteOptimization())
                .predictionAnalysis(metrics.getPredictionAnalysis())
                .build());
    }
    
    private AIMetrics getDefaultMetrics() {
        return AIMetrics.builder()
                .fleetOptimizationScore(94)
                .trafficFlowEfficiency(87)
                .signalTimingOptimization(91)
                .congestionReduction(23)
                .emergencyResponseTime(4)
                .tropicalStatus("active")
                .patternRecognition(true)
                .routeOptimization(78)
                .predictionAnalysis(true)
                .build();
    }
}
