package com.neurofleetx.entity;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "vehicles")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Vehicle {
    @Id
    private String id;
    
    @Column(nullable = false)
    private String model;
    
    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private VehicleType type;
    
    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private VehicleStatus status;
    
    @Column(name = "license_plate", nullable = false, unique = true)
    private String licensePlate;
    
    @Column(name = "location_lat")
    private Double locationLat;
    
    @Column(name = "location_lng")
    private Double locationLng;
    
    @Column(name = "location_address")
    private String locationAddress;
    
    @Column(nullable = false)
    private Integer fuel;
    
    @Column(nullable = false)
    private Integer health;
    
    @Column(nullable = false)
    private Integer mileage;
    
    @Column(name = "driver_id")
    private String driverId;
    
    @Column(name = "last_update")
    private LocalDateTime lastUpdate;
    
    @PreUpdate
    protected void onUpdate() {
        lastUpdate = LocalDateTime.now();
    }
    
    public enum VehicleType {
        sedan, suv, truck, van, bus
    }
    
    public enum VehicleStatus {
        active, maintenance, available, offline
    }
}
