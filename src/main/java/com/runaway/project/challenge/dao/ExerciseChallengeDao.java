package com.runaway.project.challenge.dao;


import com.runaway.project.challenge.dto.ExerciseChallengeDto;
import com.runaway.project.challenge.repository.ExerciseChallengeRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
@AllArgsConstructor
public class ExerciseChallengeDao {
    private ExerciseChallengeRepository exerciseChallengeRepository;

    public List<ExerciseChallengeDto> getAllexercise() {
        return exerciseChallengeRepository.findAll();
    }
}
