package com.neurofleetx.entity;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "ai_metrics")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class AIMetrics {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(name = "fleet_optimization_score", nullable = false)
    private Integer fleetOptimizationScore;
    
    @Column(name = "traffic_flow_efficiency", nullable = false)
    private Integer trafficFlowEfficiency;
    
    @Column(name = "signal_timing_optimization", nullable = false)
    private Integer signalTimingOptimization;
    
    @Column(name = "congestion_reduction", nullable = false)
    private Integer congestionReduction;
    
    @Column(name = "emergency_response_time", nullable = false)
    private Integer emergencyResponseTime;
    
    @Column(name = "tropical_status")
    private String tropicalStatus;
    
    @Column(name = "pattern_recognition")
    private Boolean patternRecognition;
    
    @Column(name = "route_optimization")
    private Integer routeOptimization;
    
    @Column(name = "prediction_analysis")
    private Boolean predictionAnalysis;
    
    @Column(name = "recorded_at")
    private LocalDateTime recordedAt;
}
