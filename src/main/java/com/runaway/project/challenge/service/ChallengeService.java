package com.runaway.project.challenge.service;

import com.runaway.project.challenge.dto.MyExerciseDto;
import com.runaway.project.challenge.dto.MyRunningDto;
import com.runaway.project.challenge.repository.MyExerciseRepository;
import com.runaway.project.challenge.repository.MyRunningRepository;
import com.runaway.project.challenge.repository.RunningChallengeRepository;
import com.runaway.project.exercise.dto.ExerciseDto;
import com.runaway.project.exercise.entity.ExerciseEntity;
import com.runaway.project.exercise.respository.ExerciseRepository;
import com.runaway.project.running.entity.RunningEntity;
import com.runaway.project.running.repository.RunningRepository;
import com.runaway.project.user.repository.GradeRepository;
import com.runaway.project.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;


@Service
@RequiredArgsConstructor
public class ChallengeService {


    @Autowired
    private ExerciseRepository exerciseRepository;
    @Autowired
    private MyExerciseRepository myExerciseRepository;
    @Autowired
    private MyRunningRepository myRunningRepository;
    private final RunningRepository runningRepository;
    @Autowired
    private final UserRepository userRepository;
    private final RunningChallengeRepository runningChallengeRepository;

    @Autowired
    private GradeRepository gradeRepository;

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

    public List<Object> getAllCurrentMonthMyChallengesList(Long userId) {
        List<MyExerciseDto> exerciseChallenges = myExerciseRepository.findByUserCurrentMonthExerciseChallengeList(userId);
        Optional<ExerciseEntity> exerciseEntity = exerciseRepository.findById(userId);
        List<MyRunningDto> runningChallenges = myRunningRepository.findByUserCurrentMonthRunningChallengeList(userId);

        List<Object> combinedChallenges = new ArrayList<>();
        combinedChallenges.addAll(exerciseChallenges);
        combinedChallenges.addAll(runningChallenges);

        return combinedChallenges;
    }

    public List<Object> getMyChallengeAllList(Long userId) {
        List<MyExerciseDto> exerciseChallenges = myExerciseRepository.findAllByUserId (userId);
        List<MyRunningDto> runningChallenges = myRunningRepository.findAllByUserId (userId);

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

    @Transactional
    public void evaluateRunningChallenge(Long idx, Long userId) {
        var myRunning = myRunningRepository.findById(idx).orElseThrow();
        var userRuns = runningRepository.findByUserIdAndDateBetween(userId, myRunning.getStartDate(), myRunning.getEndDate());
        System.out.println("User runs found: " + userRuns.size());

        boolean challengeSuccess = true;
        LocalDate currentDate = myRunning.getStartDate();
        while (!currentDate.isAfter(myRunning.getEndDate())) {
            LocalDate finalCurrentDate = currentDate;
            double dailyTotalDistance = userRuns.stream()
                    .filter(run -> run.getDate().isEqual(finalCurrentDate))
                    .mapToDouble(RunningEntity::getDistance)
                    .sum();

            System.out.println("Date: " + currentDate + ", Total distance: " + dailyTotalDistance);
            if (dailyTotalDistance < myRunning.getRunningChallenge().getDistance()) {
                challengeSuccess = false;
                System.out.println("실패");
                break;
            }

            currentDate = currentDate.plusDays(1);
        }

        if (challengeSuccess) {
            var user = userRepository.findById(userId).orElseThrow();
            user.addPoints(myRunning.getRunningChallenge().getExp(), gradeRepository);
            userRepository.save(user);
            myRunning.setDailySuccess(true);
        } else {
            myRunning.setDailySuccess(false);
        }

        myRunningRepository.save(myRunning);
        System.out.println("성공");
    }
}
