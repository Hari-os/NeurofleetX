package com.neurofleetx.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class AIMetricsDTO {
    private Integer fleetOptimizationScore;
    private Integer trafficFlowEfficiency;
    private Integer signalTimingOptimization;
    private Integer congestionReduction;
    private Integer emergencyResponseTime;
    private TropicalOptimizationDTO tropicalOptimization;
    
    @Data
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class TropicalOptimizationDTO {
        private String status;
        private Boolean patternRecognition;
        private Integer routeOptimization;
        private Boolean predictionAnalysis;
    }
}
