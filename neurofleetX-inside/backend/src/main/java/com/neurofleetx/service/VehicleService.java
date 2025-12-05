package com.neurofleetx.service;

import com.neurofleetx.dto.VehicleDTO;
import com.neurofleetx.entity.Vehicle;
import com.neurofleetx.repository.VehicleRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class VehicleService {
    
    private final VehicleRepository vehicleRepository;
    
    public List<VehicleDTO> getAllVehicles() {
        return vehicleRepository.findAll().stream()
                .map(this::toDTO)
                .collect(Collectors.toList());
    }
    
    public VehicleDTO getVehicleById(String id) {
        return vehicleRepository.findById(id)
                .map(this::toDTO)
                .orElseThrow(() -> new RuntimeException("Vehicle not found"));
    }
    
    public List<VehicleDTO> getAvailableVehicles() {
        return vehicleRepository.findByStatus(Vehicle.VehicleStatus.available).stream()
                .map(this::toDTO)
                .collect(Collectors.toList());
    }
    
    public List<VehicleDTO> getVehiclesByDriver(String driverId) {
        return vehicleRepository.findByDriverId(driverId).stream()
                .map(this::toDTO)
                .collect(Collectors.toList());
    }
    
    public VehicleDTO createVehicle(VehicleDTO vehicleDTO) {
        Vehicle vehicle = new Vehicle();
        vehicle.setId("VEH-" + String.format("%03d", System.currentTimeMillis() % 1000));
        vehicle.setModel(vehicleDTO.getModel());
        vehicle.setType(vehicleDTO.getType());
        vehicle.setStatus(vehicleDTO.getStatus() != null ? vehicleDTO.getStatus() : Vehicle.VehicleStatus.available);
        vehicle.setLicensePlate(vehicleDTO.getLicensePlate());
        vehicle.setFuel(vehicleDTO.getFuel() != null ? vehicleDTO.getFuel() : 100);
        vehicle.setHealth(vehicleDTO.getHealth() != null ? vehicleDTO.getHealth() : 100);
        vehicle.setMileage(vehicleDTO.getMileage() != null ? vehicleDTO.getMileage() : 0);
        vehicle.setDriverId(vehicleDTO.getDriverId());
        
        if (vehicleDTO.getLocation() != null) {
            vehicle.setLocationLat(vehicleDTO.getLocation().getLat());
            vehicle.setLocationLng(vehicleDTO.getLocation().getLng());
            vehicle.setLocationAddress(vehicleDTO.getLocation().getAddress());
        } else {
            vehicle.setLocationLat(0.0);
            vehicle.setLocationLng(0.0);
            vehicle.setLocationAddress("Not specified");
        }
        
        return toDTO(vehicleRepository.save(vehicle));
    }
    
    public VehicleDTO updateVehicle(String id, VehicleDTO vehicleDTO) {
        Vehicle vehicle = vehicleRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Vehicle not found"));
        
        if (vehicleDTO.getStatus() != null) vehicle.setStatus(vehicleDTO.getStatus());
        if (vehicleDTO.getFuel() != null) vehicle.setFuel(vehicleDTO.getFuel());
        if (vehicleDTO.getHealth() != null) vehicle.setHealth(vehicleDTO.getHealth());
        if (vehicleDTO.getDriverId() != null) vehicle.setDriverId(vehicleDTO.getDriverId());
        if (vehicleDTO.getLocation() != null) {
            vehicle.setLocationLat(vehicleDTO.getLocation().getLat());
            vehicle.setLocationLng(vehicleDTO.getLocation().getLng());
            vehicle.setLocationAddress(vehicleDTO.getLocation().getAddress());
        }
        
        return toDTO(vehicleRepository.save(vehicle));
    }
    
    public void deleteVehicle(String id) {
        vehicleRepository.deleteById(id);
    }
    
    private VehicleDTO toDTO(Vehicle vehicle) {
        return VehicleDTO.builder()
                .id(vehicle.getId())
                .model(vehicle.getModel())
                .type(vehicle.getType())
                .status(vehicle.getStatus())
                .licensePlate(vehicle.getLicensePlate())
                .location(VehicleDTO.LocationDTO.builder()
                        .lat(vehicle.getLocationLat())
                        .lng(vehicle.getLocationLng())
                        .address(vehicle.getLocationAddress())
                        .build())
                .fuel(vehicle.getFuel())
                .health(vehicle.getHealth())
                .mileage(vehicle.getMileage())
                .driverId(vehicle.getDriverId())
                .lastUpdate(vehicle.getLastUpdate())
                .build();
    }
}
