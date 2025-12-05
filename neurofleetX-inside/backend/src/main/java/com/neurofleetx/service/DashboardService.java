package com.neurofleetx.service;

import com.neurofleetx.dto.DashboardStatsDTO;
import com.neurofleetx.entity.Vehicle;
import com.neurofleetx.repository.BookingRepository;
import com.neurofleetx.repository.VehicleRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Service
@RequiredArgsConstructor
public class DashboardService {
    
    private final VehicleRepository vehicleRepository;
    private final BookingRepository bookingRepository;
    
    public DashboardStatsDTO getStats() {
        long totalVehicles = vehicleRepository.count();
        long activeVehicles = vehicleRepository.countByStatus(Vehicle.VehicleStatus.active);
        long inServiceVehicles = vehicleRepository.countByStatus(Vehicle.VehicleStatus.maintenance);
        long offlineVehicles = vehicleRepository.countByStatus(Vehicle.VehicleStatus.offline);
        long currentBookings = bookingRepository.countActiveBookings();
        
        LocalDateTime startOfDay = LocalDate.now().atStartOfDay();
        BigDecimal todayRevenue = bookingRepository.getTodayRevenue(startOfDay);
        if (todayRevenue == null) todayRevenue = BigDecimal.ZERO;
        
        Double avgHealth = vehicleRepository.getAverageHealth();
        Double avgFuel = vehicleRepository.getAverageFuel();
        
        return DashboardStatsDTO.builder()
                .totalVehicles(totalVehicles)
                .activeVehicles(activeVehicles)
                .inServiceVehicles(inServiceVehicles)
                .offlineVehicles(offlineVehicles)
                .currentBookings(currentBookings)
                .todayRevenue(todayRevenue)
                .fuelEfficiency(avgFuel != null ? avgFuel / 10 : 12.5) // Convert to km/l estimate
                .avgVehicleHealth(avgHealth != null ? avgHealth : 0)
                .build();
    }
}
