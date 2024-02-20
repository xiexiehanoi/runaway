package com.runaway.project.challenge.repository;


import com.runaway.project.challenge.dto.MyRunningDto;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;
import java.time.LocalDate;
import java.util.List;

public interface MyRunningRepository extends JpaRepository<MyRunningDto,Long> {

    List<MyRunningDto> findAllByUserIdAndStartDate(Long userId,LocalDate starDate);

    @Query("select mr from MyRunningDto mr where mr.user.id=:userId order by mr.startDate DESC")
    List<MyRunningDto> findByUserRunningChallengeList(@Param("userId") Long userId);

    @Modifying
    @Transactional
    @Query("UPDATE MyRunningDto m SET m.daily_success = :daily_success WHERE m.idx = :idx")
    void updateDailySuccessById(@Param("daily_success") boolean daily_success, @Param("idx") int idx);

}
