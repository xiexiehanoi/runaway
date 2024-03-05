package com.runaway.project.running.repository;

import com.runaway.project.running.entity.RunningEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;


public interface RunningRepository  extends JpaRepository<RunningEntity ,Long> {

    List<RunningEntity> findByUserId(Long userId);
    @Query("SELECT r FROM RunningEntity r WHERE r.user.id = :userId AND r.date BETWEEN :startDate AND :endDate")
    List<RunningEntity> findByUserIdAndDateBetween(Long userId, LocalDate startDate, LocalDate endDate);

    @Query("SELECT COALESCE(SUM(r.distance), 0) FROM RunningEntity r WHERE r.date = :date  AND r.user.id = :userId")
    Integer sumRunningDistanceByDate(LocalDate date, Long userId);


    @Query("SELECT r FROM RunningEntity r WHERE r.user.id = :userIdx AND YEAR(r.date) = YEAR(CURRENT_DATE) AND MONTH(r.date) = MONTH(CURRENT_DATE) ORDER BY r.date DESC")
    List<RunningEntity> findByUserCurrentMonth(@Param("userIdx") Long userIdx);

    @Query("SELECT MIN(r.date) as startDate FROM RunningEntity r WHERE r.user.id = :userId")
    LocalDate findStartDateByUserId(@Param("userId") Long userId);





}
