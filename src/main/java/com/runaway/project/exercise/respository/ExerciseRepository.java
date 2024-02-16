package com.runaway.project.exercise.respository;


import com.runaway.project.exercise.entity.ExerciseEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDate;
import java.util.List;

public interface ExerciseRepository extends JpaRepository<ExerciseEntity,Long> {
    List<ExerciseEntity> findByUserId(Long userID);

//    List<ExerciseEntity> findByUserIdDateExerciseType(Long userId, LocalDate date,String exerciseType);
}
