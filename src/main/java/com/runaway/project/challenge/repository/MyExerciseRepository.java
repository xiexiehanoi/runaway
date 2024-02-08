package com.runaway.project.challenge.repository;

import com.runaway.project.challenge.dto.MyExerciseDto;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MyExerciseRepository extends JpaRepository<MyExerciseDto,Long> {
}
