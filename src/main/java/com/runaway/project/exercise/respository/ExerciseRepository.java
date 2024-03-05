package com.runaway.project.exercise.respository;


import com.runaway.project.exercise.entity.ExerciseEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDate;
import java.util.List;

public interface ExerciseRepository extends JpaRepository<ExerciseEntity,Long> {
    @Query("SELECT COALESCE(SUM(e.exerciseCount), 0) FROM ExerciseEntity e WHERE e.date = :date AND e.exerciseType = :exerciseType AND e.user.id = :userId")
    Integer sumExerciseCountByDateAndType(LocalDate date, String exerciseType, Long userId);

    @Query("SELECT e FROM ExerciseEntity e WHERE e.user.id = :userIdx AND YEAR(e.date) = YEAR(CURRENT_DATE) AND MONTH(e.date) = MONTH(CURRENT_DATE) ORDER BY e.date DESC")
    List<ExerciseEntity> findByUserCurrentMonth(@Param("userIdx") Long userIdx);

    @Query("SELECT MIN(e.date) AS startDate FROM ExerciseEntity e WHERE e.user.id = :userId AND e.exerciseType = :exerciseType")
    LocalDate findStartDateByUserIdAndType(@Param("userId") Long userId, @Param("exerciseType") String exerciseType);

}
