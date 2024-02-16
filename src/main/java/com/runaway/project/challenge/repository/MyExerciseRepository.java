package com.runaway.project.challenge.repository;

import com.runaway.project.challenge.dto.MyExerciseDto;
import com.runaway.project.challenge.dto.MyRunningDto;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface MyExerciseRepository extends JpaRepository<MyExerciseDto,Long> {
    @Query("select mx from MyExerciseDto mx where mx.user.id=:userId order by mx.start_date DESC")
    List<MyExerciseDto> findByUserExerciseChallengeList(Long userId);
}
