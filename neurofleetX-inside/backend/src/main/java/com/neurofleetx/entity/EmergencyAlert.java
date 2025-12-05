package com.neurofleetx.entity;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "emergency_alerts")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class EmergencyAlert {
    @Id
    private String id;
    
    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private EmergencyType type;
    
    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private Severity severity;
    
    @Column(name = "location_lat", nullable = false)
    private Double locationLat;
    
    @Column(name = "location_lng", nullable = false)
    private Double locationLng;
    
    @Column(name = "location_address", nullable = false)
    private String locationAddress;
    
    @Column(name = "destination_lat", nullable = false)
    private Double destinationLat;
    
    @Column(name = "destination_lng", nullable = false)
    private Double destinationLng;
    
    @Column(name = "destination_address", nullable = false)
    private String destinationAddress;
    
    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private AlertStatus status;
    
    @Column(nullable = false)
    private LocalDateTime timestamp;
    
    @Column(name = "estimated_arrival")
    private Integer estimatedArrival;
    
    public enum EmergencyType {
        ambulance, fire_truck, police, emergency_vehicle
    }
    
    public enum Severity {
        high, medium, low
    }
    
    public enum AlertStatus {
        active, responding, resolved
    }
}
