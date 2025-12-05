package com.neurofleetx.entity;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "system_health")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class SystemHealth {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(nullable = false)
    private Double uptime;
    
    @Column(name = "response_time", nullable = false)
    private Integer responseTime;
    
    @Column(name = "data_processing_speed", nullable = false)
    private Integer dataProcessingSpeed;
    
    @Enumerated(EnumType.STRING)
    @Column(name = "network_status", nullable = false)
    private NetworkStatus networkStatus;
    
    @Column(name = "processing_throughput", nullable = false)
    private Integer processingThroughput;
    
    @Column(name = "cpu_usage", nullable = false)
    private Integer cpuUsage;
    
    @Column(name = "memory_usage", nullable = false)
    private Integer memoryUsage;
    
    @Column(name = "recorded_at")
    private LocalDateTime recordedAt;
    
    public enum NetworkStatus {
        optimal, degraded, critical
    }
}
