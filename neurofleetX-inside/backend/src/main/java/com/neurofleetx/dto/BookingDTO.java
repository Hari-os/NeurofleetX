package com.neurofleetx.dto;

import com.neurofleetx.entity.Booking.BookingStatus;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.math.BigDecimal;
import java.time.LocalDateTime;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class BookingDTO {
    private String id;
    private String customerId;
    private String customerName;
    private String vehicleId;
    private String driverId;
    private BookingStatus status;
    private LocationDTO pickup;
    private LocationDTO destination;
    private LocalDateTime scheduledTime;
    private LocalDateTime completedTime;
    private BigDecimal fare;
    private Integer rating;
    
    @Data
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class LocationDTO {
        private Double lat;
        private Double lng;
        private String address;
    }
}
