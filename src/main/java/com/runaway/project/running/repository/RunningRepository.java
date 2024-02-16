package com.runaway.project.running.repository;

import com.runaway.project.running.entity.RunningEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;


public interface RunningRepository  extends JpaRepository<RunningEntity ,Long> {

    List<RunningEntity> findByUserId(Long userId);

    @Query("select r from RunningEntity r where r.user.id = :userId and r.date between :startDate and :endDate")
    List<RunningEntity> findAllByUserIdAndDate(Long userId, LocalDate startDate, LocalDate endDate);
}
