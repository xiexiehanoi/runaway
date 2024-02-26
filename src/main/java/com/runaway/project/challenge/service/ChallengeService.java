package com.runaway.project.challenge.service;

import com.runaway.project.challenge.dto.MyExerciseDto;
import com.runaway.project.challenge.dto.MyRunningDto;
import com.runaway.project.challenge.repository.MyExerciseRepository;
import com.runaway.project.challenge.repository.MyRunningRepository;
import com.runaway.project.challenge.repository.RunningChallengeRepository;
import com.runaway.project.running.entity.RunningEntity;
import com.runaway.project.running.repository.RunningRepository;
import com.runaway.project.user.entity.User;
import com.runaway.project.user.repository.UserRepository;
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
    private final UserRepository userRepository;
    private final RunningChallengeRepository runningChallengeRepository;

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

//        System.out.println("결과: " +combinedChallenges);
        return combinedChallenges;
    }



    public static class ChallengeAlreadyExistsException extends RuntimeException {
        public ChallengeAlreadyExistsException(String message) {
            super(message);
        }
    }

    @Transactional
    public void evaluateRunningChallenge(Long idx, Long userId) {
        var myRunning = myRunningRepository.findById(idx).orElseThrow();
        var userRuns = runningRepository.findByUserIdAndDateBetween(userId, myRunning.getStartDate(), myRunning.getEndDate());
//        System.out.println("User runs found: " + userRuns.size());

        boolean challengeSuccess = true;
        LocalDate currentDate = myRunning.getStartDate();
        while (!currentDate.isAfter(myRunning.getEndDate())) {
            LocalDate finalCurrentDate = currentDate;
            double dailyTotalDistance = userRuns.stream()
                    .filter(run -> run.getDate().isEqual(finalCurrentDate))
                    .mapToDouble(RunningEntity::getDistance)
                    .sum();

//            System.out.println("Date: " + currentDate + ", Total distance: " + dailyTotalDistance);
            if (dailyTotalDistance < myRunning.getRunningChallenge().getDistance()) {
                challengeSuccess = false;
                System.out.println("실패");
                break;
            }

            currentDate = currentDate.plusDays(1);
        }

        if (challengeSuccess) {
            var user = userRepository.findById(userId).orElseThrow();
            user.addPoints(myRunning.getRunningChallenge().getExp());
            userRepository.save(user);
            myRunning.setDailySuccess(true);
        } else {
            myRunning.setDailySuccess(false);
        }

        myRunningRepository.save(myRunning);
        System.out.println("성공");
    }
}
