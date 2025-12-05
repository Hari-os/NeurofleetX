package com.neurofleetx.config;

import com.neurofleetx.entity.*;
import com.neurofleetx.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;
import java.math.BigDecimal;
import java.time.LocalDateTime;

@Component
@RequiredArgsConstructor
public class DataInitializer implements CommandLineRunner {
    
    private final UserRepository userRepository;
    private final VehicleRepository vehicleRepository;
    private final BookingRepository bookingRepository;
    private final EmergencyAlertRepository emergencyAlertRepository;
    private final MaintenanceRepository maintenanceRepository;
    private final AIMetricsRepository aiMetricsRepository;
    private final SystemHealthRepository systemHealthRepository;
    private final PasswordEncoder passwordEncoder;
    
    @Override
    public void run(String... args) {
        if (userRepository.count() == 0) {
            initializeUsers();
            initializeVehicles();
            initializeBookings();
            initializeEmergencyAlerts();
            initializeMaintenance();
            initializeAIMetrics();
            initializeSystemHealth();
        }
    }
    
    private void initializeUsers() {
        userRepository.save(User.builder()
                .username("admin")
                .email("admin@neurofleetx.com")
                .password(passwordEncoder.encode("admin123"))
                .role(User.UserRole.admin)
                .build());
        
        userRepository.save(User.builder()
                .username("driver1")
                .email("driver@neurofleetx.com")
                .password(passwordEncoder.encode("driver123"))
                .role(User.UserRole.driver)
                .build());
        
        userRepository.save(User.builder()
                .username("customer1")
                .email("customer@neurofleetx.com")
                .password(passwordEncoder.encode("customer123"))
                .role(User.UserRole.customer)
                .build());
        
        userRepository.save(User.builder()
                .username("passenger1")
                .email("passenger@neurofleetx.com")
                .password(passwordEncoder.encode("passenger123"))
                .role(User.UserRole.passenger)
                .build());
    }
    
    private void initializeVehicles() {
        String[] models = {"Toyota Innova", "Maruti Ertiga", "Tata Nexon", "Mahindra XUV700", "Hyundai Creta"};
        Vehicle.VehicleType[] types = {Vehicle.VehicleType.suv, Vehicle.VehicleType.van, Vehicle.VehicleType.sedan, Vehicle.VehicleType.suv, Vehicle.VehicleType.suv};
        Vehicle.VehicleStatus[] statuses = {Vehicle.VehicleStatus.active, Vehicle.VehicleStatus.available, Vehicle.VehicleStatus.active, Vehicle.VehicleStatus.maintenance, Vehicle.VehicleStatus.available};
        
        double[][] locations = {
                {17.4065, 78.4772}, {17.3850, 78.4867}, {17.4156, 78.4347}, {17.4399, 78.4983}, {17.3616, 78.4747}
        };
        
        String[] addresses = {
                "Hitech City, Hyderabad", "Gachibowli, Hyderabad", "Banjara Hills, Hyderabad", 
                "Secunderabad Railway Station", "Charminar, Hyderabad"
        };
        
        for (int i = 0; i < 5; i++) {
            vehicleRepository.save(Vehicle.builder()
                    .id("VH-00" + (i + 1))
                    .model(models[i])
                    .type(types[i])
                    .status(statuses[i])
                    .licensePlate("TS09AB" + (1000 + i))
                    .locationLat(locations[i][0])
                    .locationLng(locations[i][1])
                    .locationAddress(addresses[i])
                    .fuel(70 + (int)(Math.random() * 30))
                    .health(85 + (int)(Math.random() * 15))
                    .mileage(10000 + (int)(Math.random() * 40000))
                    .lastUpdate(LocalDateTime.now())
                    .build());
        }
    }
    
    private void initializeBookings() {
        bookingRepository.save(Booking.builder()
                .id("BK-001")
                .customerId("customer1")
                .customerName("Rahul Sharma")
                .status(Booking.BookingStatus.pending)
                .pickupLat(17.4065)
                .pickupLng(78.4772)
                .pickupAddress("Hitech City Metro Station")
                .destinationLat(17.4399)
                .destinationLng(78.4983)
                .destinationAddress("Secunderabad Railway Station")
                .scheduledTime(LocalDateTime.now().plusHours(1))
                .build());
        
        bookingRepository.save(Booking.builder()
                .id("BK-002")
                .customerId("customer2")
                .customerName("Priya Patel")
                .vehicleId("VH-001")
                .driverId("driver1")
                .status(Booking.BookingStatus.assigned)
                .pickupLat(17.3850)
                .pickupLng(78.4867)
                .pickupAddress("Gachibowli Stadium")
                .destinationLat(17.4156)
                .destinationLng(78.4347)
                .destinationAddress("Banjara Hills Road No 12")
                .scheduledTime(LocalDateTime.now().plusMinutes(30))
                .build());
    }
    
    private void initializeEmergencyAlerts() {
        emergencyAlertRepository.save(EmergencyAlert.builder()
                .id("EM-001")
                .type(EmergencyAlert.EmergencyType.ambulance)
                .severity(EmergencyAlert.Severity.high)
                .locationLat(17.4065)
                .locationLng(78.4772)
                .locationAddress("Hitech City Junction")
                .destinationLat(17.4156)
                .destinationLng(78.4347)
                .destinationAddress("Apollo Hospital, Jubilee Hills")
                .status(EmergencyAlert.AlertStatus.active)
                .timestamp(LocalDateTime.now())
                .estimatedArrival(8)
                .build());
    }
    
    private void initializeMaintenance() {
        maintenanceRepository.save(Maintenance.builder()
                .id("MT-001")
                .vehicleId("VH-004")
                .type(Maintenance.MaintenanceType.predictive)
                .description("Brake pad replacement predicted")
                .status(Maintenance.MaintenanceStatus.pending)
                .predictedIssue("Brake wear detected at 78%")
                .estimatedCost(BigDecimal.valueOf(4500))
                .scheduledDate(LocalDateTime.now().plusDays(3))
                .build());
    }
    
    private void initializeAIMetrics() {
        aiMetricsRepository.save(AIMetrics.builder()
                .fleetOptimizationScore(94)
                .trafficFlowEfficiency(87)
                .signalTimingOptimization(91)
                .congestionReduction(23)
                .emergencyResponseTime(4)
                .tropicalStatus("active")
                .patternRecognition(true)
                .routeOptimization(78)
                .predictionAnalysis(true)
                .recordedAt(LocalDateTime.now())
                .build());
    }
    
    private void initializeSystemHealth() {
        systemHealthRepository.save(SystemHealth.builder()
                .uptime(99.97)
                .responseTime(45)
                .dataProcessingSpeed(1250)
                .networkStatus(SystemHealth.NetworkStatus.optimal)
                .processingThroughput(98)
                .cpuUsage(42)
                .memoryUsage(68)
                .recordedAt(LocalDateTime.now())
                .build());
    }
}
