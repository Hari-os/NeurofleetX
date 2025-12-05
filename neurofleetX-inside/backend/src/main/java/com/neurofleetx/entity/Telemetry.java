package com.neurofleetx.entity;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "telemetry")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Telemetry {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(name = "vehicle_id", nullable = false)
    private String vehicleId;
    
    @Column(nullable = false)
    private LocalDateTime timestamp;
    
    @Column(name = "location_lat", nullable = false)
    private Double locationLat;
    
    @Column(name = "location_lng", nullable = false)
    private Double locationLng;
    
    @Column(nullable = false)
    private Integer speed;
    
    @Column(nullable = false)
    private Integer fuel;
    
    @Column(name = "engine_health", nullable = false)
    private Integer engineHealth;
    
    @Column(name = "brake_health", nullable = false)
    private Integer brakeHealth;
    
    @Column(name = "tire_health", nullable = false)
    private Integer tireHealth;
}
