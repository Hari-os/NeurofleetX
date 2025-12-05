package com.neurofleetx.service;

import com.neurofleetx.dto.BookingDTO;
import com.neurofleetx.entity.Booking;
import com.neurofleetx.entity.Vehicle;
import com.neurofleetx.repository.BookingRepository;
import com.neurofleetx.repository.VehicleRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class BookingService {
    
    private final BookingRepository bookingRepository;
    private final VehicleRepository vehicleRepository;
    
    public List<BookingDTO> getAllBookings() {
        return bookingRepository.findAll().stream()
                .map(this::toDTO)
                .collect(Collectors.toList());
    }
    
    public List<BookingDTO> getBookingsByCustomer(String customerId) {
        return bookingRepository.findByCustomerId(customerId).stream()
                .map(this::toDTO)
                .collect(Collectors.toList());
    }
    
    public List<BookingDTO> getBookingsByDriver(String driverId) {
        return bookingRepository.findByDriverId(driverId).stream()
                .map(this::toDTO)
                .collect(Collectors.toList());
    }
    
    public BookingDTO createBooking(BookingDTO dto) {
        Booking booking = Booking.builder()
                .id("BK-" + UUID.randomUUID().toString().substring(0, 8).toUpperCase())
                .customerId(dto.getCustomerId())
                .customerName(dto.getCustomerName())
                .status(Booking.BookingStatus.pending)
                .pickupLat(dto.getPickup().getLat())
                .pickupLng(dto.getPickup().getLng())
                .pickupAddress(dto.getPickup().getAddress())
                .destinationLat(dto.getDestination().getLat())
                .destinationLng(dto.getDestination().getLng())
                .destinationAddress(dto.getDestination().getAddress())
                .scheduledTime(dto.getScheduledTime())
                .build();
        
        return toDTO(bookingRepository.save(booking));
    }
    
    @Transactional
    public BookingDTO assignVehicle(String bookingId, String vehicleId, String driverId) {
        Booking booking = bookingRepository.findById(bookingId)
                .orElseThrow(() -> new RuntimeException("Booking not found"));
        
        Vehicle vehicle = vehicleRepository.findById(vehicleId)
                .orElseThrow(() -> new RuntimeException("Vehicle not found"));
        
        booking.setVehicleId(vehicleId);
        booking.setDriverId(driverId);
        booking.setStatus(Booking.BookingStatus.assigned);
        
        vehicle.setStatus(Vehicle.VehicleStatus.active);
        vehicle.setDriverId(driverId);
        vehicleRepository.save(vehicle);
        
        return toDTO(bookingRepository.save(booking));
    }
    
    @Transactional
    public BookingDTO updateStatus(String bookingId, Booking.BookingStatus status) {
        Booking booking = bookingRepository.findById(bookingId)
                .orElseThrow(() -> new RuntimeException("Booking not found"));
        
        booking.setStatus(status);
        
        if (status == Booking.BookingStatus.completed) {
            booking.setCompletedTime(LocalDateTime.now());
            booking.setFare(BigDecimal.valueOf(Math.random() * 500 + 200));
            
            if (booking.getVehicleId() != null) {
                vehicleRepository.findById(booking.getVehicleId()).ifPresent(vehicle -> {
                    vehicle.setStatus(Vehicle.VehicleStatus.available);
                    vehicleRepository.save(vehicle);
                });
            }
        }
        
        return toDTO(bookingRepository.save(booking));
    }
    
    private BookingDTO toDTO(Booking booking) {
        return BookingDTO.builder()
                .id(booking.getId())
                .customerId(booking.getCustomerId())
                .customerName(booking.getCustomerName())
                .vehicleId(booking.getVehicleId())
                .driverId(booking.getDriverId())
                .status(booking.getStatus())
                .pickup(BookingDTO.LocationDTO.builder()
                        .lat(booking.getPickupLat())
                        .lng(booking.getPickupLng())
                        .address(booking.getPickupAddress())
                        .build())
                .destination(BookingDTO.LocationDTO.builder()
                        .lat(booking.getDestinationLat())
                        .lng(booking.getDestinationLng())
                        .address(booking.getDestinationAddress())
                        .build())
                .scheduledTime(booking.getScheduledTime())
                .completedTime(booking.getCompletedTime())
                .fare(booking.getFare())
                .rating(booking.getRating())
                .build();
    }
}
