package com.runaway.project.challenge.repository;

import com.runaway.project.challenge.dto.ExerciseDto;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ExerciseRepository extends JpaRepository<ExerciseDto,Long> {
}
