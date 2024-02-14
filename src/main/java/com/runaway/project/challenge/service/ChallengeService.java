package com.runaway.project.challenge.service;

import com.runaway.project.challenge.dto.MyExerciseDto;
import com.runaway.project.challenge.repository.MyExerciseRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ChallengeService {

    @Autowired
    private MyExerciseRepository myExerciseRepository;

    public void insertExerciseChallenge(MyExerciseDto myExerciseDto){
        myExerciseRepository.save(myExerciseDto);
    }
}
