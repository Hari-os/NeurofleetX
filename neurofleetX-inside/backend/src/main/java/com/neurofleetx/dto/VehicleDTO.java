package com.neurofleetx.dto;

import com.neurofleetx.entity.Vehicle.VehicleStatus;
import com.neurofleetx.entity.Vehicle.VehicleType;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDateTime;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class VehicleDTO {
    private String id;
    private String model;
    private VehicleType type;
    private VehicleStatus status;
    private String licensePlate;
    private LocationDTO location;
    private Integer fuel;
    private Integer health;
    private Integer mileage;
    private String driverId;
    private LocalDateTime lastUpdate;
    
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
