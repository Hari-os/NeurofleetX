package com.neurofleetx.controller;

import com.neurofleetx.dto.BookingDTO;
import com.neurofleetx.entity.Booking;
import com.neurofleetx.service.BookingService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/bookings")
@RequiredArgsConstructor
public class BookingController {
    
    private final BookingService bookingService;
    
    @GetMapping
    public ResponseEntity<List<BookingDTO>> getAllBookings() {
        return ResponseEntity.ok(bookingService.getAllBookings());
    }
    
    @GetMapping("/customer/{customerId}")
    public ResponseEntity<List<BookingDTO>> getBookingsByCustomer(@PathVariable String customerId) {
        return ResponseEntity.ok(bookingService.getBookingsByCustomer(customerId));
    }
    
    @GetMapping("/driver/{driverId}")
    public ResponseEntity<List<BookingDTO>> getBookingsByDriver(@PathVariable String driverId) {
        return ResponseEntity.ok(bookingService.getBookingsByDriver(driverId));
    }
    
    @PostMapping
    public ResponseEntity<BookingDTO> createBooking(@RequestBody BookingDTO bookingDTO) {
        return ResponseEntity.ok(bookingService.createBooking(bookingDTO));
    }
    
    @PutMapping("/{id}/assign")
    public ResponseEntity<BookingDTO> assignVehicle(
            @PathVariable String id,
            @RequestBody Map<String, String> request) {
        return ResponseEntity.ok(bookingService.assignVehicle(
                id, 
                request.get("vehicleId"), 
                request.get("driverId")
        ));
    }
    
    @PutMapping("/{id}/status")
    public ResponseEntity<BookingDTO> updateStatus(
            @PathVariable String id,
            @RequestBody Map<String, String> request) {
        return ResponseEntity.ok(bookingService.updateStatus(
                id, 
                Booking.BookingStatus.valueOf(request.get("status"))
        ));
    }
}
