package com.runaway.project.challenge.repository;

import com.runaway.project.challenge.dto.MyExerciseDto;
import com.runaway.project.challenge.dto.MyRunningDto;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import java.util.List;

public interface MyExerciseRepository extends JpaRepository<MyExerciseDto, Long> {
    @Query("SELECT me FROM MyExerciseDto me WHERE me.user.id = :userId AND me.exerciseChallengeDto.exercise_type = :exerciseType AND me.end_date > CURRENT_DATE")
    List<MyExerciseDto> findAllActiveByUserIdAndExerciseType(@Param("userId") Long userId, @Param("exerciseType") String exerciseType);

    @Query("select mx from MyExerciseDto mx where mx.user.id=:userId AND mx.start_date <= CURRENT_DATE AND mx.end_date >= CURRENT_DATE order by mx.start_date DESC")
    List<MyExerciseDto> findByUserExerciseChallengeList(@Param("userId") Long userId);


    @Query("select mx from MyExerciseDto mx where mx.user.id=:userId AND YEAR(mx.start_date) <= YEAR(CURRENT_DATE) AND MONTH(mx.start_date) <= MONTH(CURRENT_DATE) AND YEAR(mx.end_date) >= YEAR(CURRENT_DATE) AND MONTH(mx.end_date) >= MONTH(CURRENT_DATE) order by mx.start_date DESC")
    List<MyExerciseDto> findByUserCurrentMonthExerciseChallengeList(@Param("userId") Long userId);


    @Query("select mx from MyExerciseDto mx where mx.user.id=:userId order by mx.start_date DESC")
    List<MyExerciseDto> findAllByUserId(Long userId);
}
