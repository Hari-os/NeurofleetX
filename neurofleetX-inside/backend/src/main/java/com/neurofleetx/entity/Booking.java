package com.neurofleetx.entity;

import jakarta.persistence.*;
import lombok.*;
import java.math.BigDecimal;
import java.time.LocalDateTime;

@Entity
@Table(name = "bookings")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Booking {
    @Id
    private String id;
    
    @Column(name = "customer_id", nullable = false)
    private String customerId;
    
    @Column(name = "customer_name", nullable = false)
    private String customerName;
    
    @Column(name = "vehicle_id")
    private String vehicleId;
    
    @Column(name = "driver_id")
    private String driverId;
    
    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private BookingStatus status;
    
    @Column(name = "pickup_lat", nullable = false)
    private Double pickupLat;
    
    @Column(name = "pickup_lng", nullable = false)
    private Double pickupLng;
    
    @Column(name = "pickup_address", nullable = false)
    private String pickupAddress;
    
    @Column(name = "destination_lat", nullable = false)
    private Double destinationLat;
    
    @Column(name = "destination_lng", nullable = false)
    private Double destinationLng;
    
    @Column(name = "destination_address", nullable = false)
    private String destinationAddress;
    
    @Column(name = "scheduled_time", nullable = false)
    private LocalDateTime scheduledTime;
    
    @Column(name = "completed_time")
    private LocalDateTime completedTime;
    
    @Column(precision = 10, scale = 2)
    private BigDecimal fare;
    
    private Integer rating;
    
    public enum BookingStatus {
        pending, assigned, in_progress, completed, cancelled
    }
}
