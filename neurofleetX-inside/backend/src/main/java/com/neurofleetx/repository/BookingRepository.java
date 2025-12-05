package com.neurofleetx.repository;

import com.neurofleetx.entity.Booking;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface BookingRepository extends JpaRepository<Booking, String> {
    List<Booking> findByCustomerId(String customerId);
    List<Booking> findByDriverId(String driverId);
    List<Booking> findByStatus(Booking.BookingStatus status);
    
    @Query("SELECT COUNT(b) FROM Booking b WHERE b.status IN ('pending', 'assigned', 'in_progress')")
    long countActiveBookings();
    
    @Query("SELECT COALESCE(SUM(b.fare), 0) FROM Booking b WHERE b.completedTime >= :startOfDay AND b.status = 'completed'")
    BigDecimal getTodayRevenue(LocalDateTime startOfDay);
}
