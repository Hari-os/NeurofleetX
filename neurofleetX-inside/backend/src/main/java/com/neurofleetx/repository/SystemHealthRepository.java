package com.neurofleetx.repository;

import com.neurofleetx.entity.SystemHealth;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import java.util.Optional;

@Repository
public interface SystemHealthRepository extends JpaRepository<SystemHealth, Long> {
    @Query("SELECT s FROM SystemHealth s ORDER BY s.recordedAt DESC LIMIT 1")
    Optional<SystemHealth> findLatest();
}
