package com.runaway.project.exercise.respository;


import com.runaway.project.exercise.entity.ExerciseEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.time.LocalDate;

public interface ExerciseRepository extends JpaRepository<ExerciseEntity,Long> {
    @Query("SELECT COALESCE(SUM(e.exerciseCount), 0) FROM ExerciseEntity e WHERE e.date = :date AND e.exerciseType = :exerciseType AND e.user.id = :userId")
    Integer sumExerciseCountByDateAndType(LocalDate date, String exerciseType, Long userId);
}
