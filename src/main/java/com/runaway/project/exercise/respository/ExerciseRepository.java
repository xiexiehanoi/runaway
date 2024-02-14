package com.runaway.project.exercise.respository;


import com.runaway.project.exercise.dto.ExerciseDto;
import com.runaway.project.running.entity.RunningEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ExerciseRepository extends JpaRepository<ExerciseDto,Long> {
    List<ExerciseDto> findByUserId(Long userId);
}
