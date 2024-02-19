package com.runaway.project.challenge.repository;

import com.runaway.project.challenge.dto.MyExerciseDto;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDate;
import java.util.List;

public interface MyExerciseRepository extends JpaRepository<MyExerciseDto, Long> {
    @Query("SELECT me FROM MyExerciseDto me WHERE me.user.id = :userId AND me.exerciseChallengeDto.exercise_type = :exerciseType AND me.end_date > CURRENT_DATE")
    List<MyExerciseDto> findAllActiveByUserIdAndExerciseType(@Param("userId") Long userId, @Param("exerciseType") String exerciseType);
}
