package com.runaway.project.challenge.repository;

import com.runaway.project.challenge.dto.ExerciseChallengeDto;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ExerciseChallengeRepository extends JpaRepository<ExerciseChallengeDto,Long> {
}
