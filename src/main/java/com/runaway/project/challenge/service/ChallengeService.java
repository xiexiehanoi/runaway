package com.runaway.project.challenge.service;

import com.runaway.project.challenge.dto.MyExerciseDto;
import com.runaway.project.challenge.dto.MyRunningDto;
import com.runaway.project.challenge.repository.MyExerciseRepository;
import com.runaway.project.challenge.repository.MyRunningRepository;
import com.runaway.project.exercise.entity.ExerciseEntity;
import com.runaway.project.exercise.respository.ExerciseRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;


@Service
@RequiredArgsConstructor
public class ChallengeService {

    @Autowired
    private MyExerciseRepository myExerciseRepository;

    @Autowired
    private MyRunningRepository myRunningRepository;

    private final ExerciseRepository exerciseRepository;

    public void insertExerciseChallenge(MyExerciseDto myExerciseDto){
//        if(myExerciseDto.getIdx() == null)
        myExerciseRepository.save(myExerciseDto);
    }

    public void insertRunningChallenge(MyRunningDto myRunningDto){

        myRunningRepository.save(myRunningDto);
    }

//    public List<ExerciseEntity> getExerciseByUserIdDateExerciseType(Long userId, LocalDate date, String exerciseType) {
//        return exerciseRepository.findByUserIdDateExerciseType(userId, date, exerciseType);
//    }

    public List<Object> getAllMyChallengesList(Long userId) {
        List<MyExerciseDto> exerciseChallenges = myExerciseRepository.findByUserExerciseChallengeList(userId);
        List<MyRunningDto> runningChallenges = myRunningRepository.findByUserRunningChallengeList(userId);

        List<Object> combinedChallenges = new ArrayList<>();
        combinedChallenges.addAll(exerciseChallenges);
        combinedChallenges.addAll(runningChallenges);

        return combinedChallenges;
    }
}
