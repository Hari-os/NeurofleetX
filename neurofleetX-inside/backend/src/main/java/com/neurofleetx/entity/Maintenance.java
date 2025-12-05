package com.neurofleetx.entity;

import jakarta.persistence.*;
import lombok.*;
import java.math.BigDecimal;
import java.time.LocalDateTime;

@Entity
@Table(name = "maintenance")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Maintenance {
    @Id
    private String id;
    
    @Column(name = "vehicle_id", nullable = false)
    private String vehicleId;
    
    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private MaintenanceType type;
    
    @Column(nullable = false)
    private String description;
    
    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private MaintenanceStatus status;
    
    @Column(name = "predicted_issue")
    private String predictedIssue;
    
    @Column(name = "estimated_cost", precision = 10, scale = 2)
    private BigDecimal estimatedCost;
    
    @Column(name = "scheduled_date", nullable = false)
    private LocalDateTime scheduledDate;
    
    @Column(name = "completed_date")
    private LocalDateTime completedDate;
    
    public enum MaintenanceType {
        scheduled, predictive, emergency
    }
    
    public enum MaintenanceStatus {
        pending, in_progress, completed
    }
}
