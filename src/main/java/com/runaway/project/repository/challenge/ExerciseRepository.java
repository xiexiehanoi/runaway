package com.runaway.project.repository.challenge;

import com.runaway.project.dto.challenge.ExerciseDto;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ExerciseRepository extends JpaRepository<ExerciseDto,Long> {
}
