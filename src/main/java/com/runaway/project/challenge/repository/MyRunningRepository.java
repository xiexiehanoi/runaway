package com.runaway.project.challenge.repository;


import com.runaway.project.challenge.dto.MyRunningDto;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import java.time.LocalDate;
import java.util.List;

public interface MyRunningRepository extends JpaRepository<MyRunningDto,Long> {

    List<MyRunningDto> findAllByUserIdAndStartDate(Long userId,LocalDate starDate);

    @Query("select mr from MyRunningDto mr where mr.user.id=:userId AND mr.startDate <= CURRENT_DATE AND mr.endDate >= CURRENT_DATE order by mr.startDate DESC")
    List<MyRunningDto> findByUserRunningChallengeList(@Param("userId") Long userId);

    @Query("SELECT mr FROM MyRunningDto mr WHERE mr.user.id = :userId AND :currentDate BETWEEN mr.startDate AND mr.endDate")
    List<MyRunningDto> findAllByUserIdAndDateRange(@Param("userId") Long userId, @Param("currentDate") LocalDate currentDate);

    List<MyRunningDto> findAllByUserIdAndEndDateGreaterThan(Long userId, LocalDate endDate);

}
