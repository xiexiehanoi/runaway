package com.runaway.project.running.repository;

import com.runaway.project.running.entity.RunningEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;


public interface RunningRepository  extends JpaRepository<RunningEntity ,Long> {

    List<RunningEntity> findByUserId(Long userId);
    @Query("SELECT r FROM RunningEntity r WHERE r.user.id = :userId AND r.date BETWEEN :startDate AND :endDate")
    List<RunningEntity> findByUserIdAndDateBetween(Long userId, LocalDate startDate, LocalDate endDate);

}
