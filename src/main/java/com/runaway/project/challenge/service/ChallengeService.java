package com.runaway.project.challenge.service;

import com.runaway.project.challenge.dto.MyExerciseDto;
import com.runaway.project.challenge.dto.MyRunningDto;
import com.runaway.project.challenge.repository.MyExerciseRepository;
import com.runaway.project.challenge.repository.MyRunningRepository;
import com.runaway.project.running.repository.RunningRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

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
    private final RunningRepository runningRepository;

    private boolean checkChallengeExists(Long userId, LocalDate startDate) {
        List<MyRunningDto> existChallenge = myRunningRepository.findAllByUserIdAndStartDate(userId, startDate);
        return !existChallenge.isEmpty();
    }

    @Transactional
    public void insertExerciseChallenge(MyExerciseDto myExerciseDto){
        Long userId = myExerciseDto.getUser().getId();
        String exerciseType = myExerciseDto.getExerciseChallengeDto().getExercise_type();

        System.out.println("Checking for existing challenge with userId: " + userId + " and exerciseType: " + exerciseType);
        if (checkChallengeExistInExercise(userId, exerciseType)) {
            throw new ChallengeAlreadyExistsException("You already have a challenge for this exercise type.");
        }

        myExerciseRepository.save(myExerciseDto);
    }

    private boolean checkChallengeExistInExercise(Long userId, String exerciseType) {
        List<MyExerciseDto> existChallenges = myExerciseRepository.findAllActiveByUserIdAndExerciseType(userId, exerciseType);
        System.out.println("Found challenges: " + existChallenges);
        return !existChallenges.isEmpty();
    }

    public void insertRunningChallenge(MyRunningDto myRunningDto, Long userId){
        boolean challengeExists = checkChallengeExists(userId, myRunningDto.getStartDate());
        if (challengeExists) {
            return;
        }
        myRunningRepository.save(myRunningDto);
    }


    public List<Object> getAllMyChallengesList(Long userId) {
        List<MyExerciseDto> exerciseChallenges = myExerciseRepository.findByUserExerciseChallengeList(userId);
        List<MyRunningDto> runningChallenges = myRunningRepository.findByUserRunningChallengeList(userId);

        List<Object> combinedChallenges = new ArrayList<>();
        combinedChallenges.addAll(exerciseChallenges);
        combinedChallenges.addAll(runningChallenges);

        return combinedChallenges;
    }



    public static class ChallengeAlreadyExistsException extends RuntimeException {
        public ChallengeAlreadyExistsException(String message) {
            super(message);
        }
    }


//    public List<RunningEntity> getRunningRecord(MyRunningDto myRunningDto, User userId){
//
//
//    }

}
