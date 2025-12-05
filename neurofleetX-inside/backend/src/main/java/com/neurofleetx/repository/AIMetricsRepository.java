package com.neurofleetx.repository;

import com.neurofleetx.entity.AIMetrics;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import java.util.Optional;

@Repository
public interface AIMetricsRepository extends JpaRepository<AIMetrics, Long> {
    @Query("SELECT a FROM AIMetrics a ORDER BY a.recordedAt DESC LIMIT 1")
    Optional<AIMetrics> findLatest();
}
