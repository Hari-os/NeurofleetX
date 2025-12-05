package com.neurofleetx.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.math.BigDecimal;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class DashboardStatsDTO {
    private long totalVehicles;
    private long activeVehicles;
    private long inServiceVehicles;
    private long offlineVehicles;
    private long currentBookings;
    private BigDecimal todayRevenue;
    private double fuelEfficiency;
    private double avgVehicleHealth;
}
