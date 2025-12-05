package com.neurofleetx.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class SystemHealthDTO {
    private Double uptime;
    private Integer responseTime;
    private Integer dataProcessingSpeed;
    private String networkStatus;
    private Integer processingThroughput;
    private Integer cpuUsage;
    private Integer memoryUsage;
}
