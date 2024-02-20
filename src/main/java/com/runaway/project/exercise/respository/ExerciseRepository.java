package com.runaway.project.exercise.respository;


import com.runaway.project.exercise.entity.ExerciseEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.time.LocalDate;

public interface ExerciseRepository extends JpaRepository<ExerciseEntity,Long> {
    @Query("SELECT SUM(e.exerciseCount) FROM ExerciseEntity e WHERE e.date = :date AND e.exerciseType = :exerciseType AND e.user.id = :userId")
    int sumExerciseCountByDateAndType(LocalDate date, String exerciseType, Long userId);
}