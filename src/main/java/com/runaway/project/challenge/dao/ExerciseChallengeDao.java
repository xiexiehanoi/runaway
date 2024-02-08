package com.runaway.project.challenge.dao;


import com.runaway.project.challenge.dto.ExerciseChallengeDto;
import com.runaway.project.challenge.dto.MyExerciseDto;
import com.runaway.project.challenge.repository.ExerciseChallengeRepository;
import com.runaway.project.challenge.repository.MyExerciseRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
@AllArgsConstructor
public class ExerciseChallengeDao {
    private ExerciseChallengeRepository exerciseChallengeRepository;
    private MyExerciseRepository myExerciseRepository;

    public List<ExerciseChallengeDto> getAllexercise() {
        return exerciseChallengeRepository.findAll();
    }

    public void insertMyExercise(MyExerciseDto dto)
    {
        myExerciseRepository.save(dto);
    }


}
