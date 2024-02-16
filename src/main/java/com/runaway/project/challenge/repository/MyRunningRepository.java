package com.runaway.project.challenge.repository;


import com.runaway.project.challenge.dto.MyRunningDto;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface MyRunningRepository extends JpaRepository<MyRunningDto,Long> {
    @Query("select mr from MyRunningDto mr where mr.user.id=:userId order by mr.start_date DESC")
    List<MyRunningDto> findByUserRunningChallengeList(Long userId);
}
