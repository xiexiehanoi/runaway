package com.runaway.project.challenge.service;

import com.runaway.project.challenge.dto.MyExerciseDto;
import com.runaway.project.challenge.dto.MyRunningDto;
import com.runaway.project.challenge.repository.MyExerciseRepository;
import com.runaway.project.challenge.repository.MyRunningRepository;
import com.runaway.project.running.entity.RunningEntity;
import com.runaway.project.running.repository.RunningRepository;
import com.runaway.project.user.entity.User;
import com.runaway.project.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class ChallengeService {

    @Autowired
    private MyExerciseRepository myExerciseRepository;

    @Autowired
    private MyRunningRepository myRunningRepository;
    private final RunningRepository runningRepository;
    private final UserRepository userRepository;

    private boolean checkRunningChallengeExists(Long userId, LocalDate startDate) {
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
        boolean challengeExists = checkRunningChallengeExists(userId, myRunningDto.getStartDate());
        if (challengeExists) {
            return;
        }
        myRunningRepository.save(myRunningDto);
    }

    public static class ChallengeAlreadyExistsException extends RuntimeException {
        public ChallengeAlreadyExistsException(String message) {
            super(message);
        }
    }

    public String evaluateRunning(Long userId, MyRunningDto myRunningDto) {
        if (myRunningDto.getStartDate() == null || myRunningDto.getEndDate() == null) {
            return "fail";
        }

        LocalDate startDate = myRunningDto.getStartDate();
        LocalDate endDate = myRunningDto.getEndDate();

        String startDate2 = myRunningDto.getStartDate().toString();
        String endDate2 = myRunningDto.getEndDate().toString();

        int targetDistance = myRunningDto.getRunningChallenge().getDistance();
        int targetDays = myRunningDto.getRunningChallenge().getTarget_date();

        List<RunningEntity> runningRecords = runningRepository.findByUserIdAndDateBetween(userId, startDate2, endDate2);

        Map<LocalDate, Integer> dailyDistances = new HashMap<>();
        for (RunningEntity record : runningRecords) {
            LocalDate recordDate = LocalDate.parse(record.getDate());
            dailyDistances.merge(recordDate, (int) Math.floor(record.getDistance()), Integer::sum);
        }

        int successDays = 0;
        for (LocalDate date = startDate; date.isBefore(endDate.plusDays(1)); date = date.plusDays(1)) {
            if (dailyDistances.getOrDefault(date, 0) >= targetDistance) {
                successDays++;
            } else {
                return "fail";
            }
        }

        if (successDays == targetDays) {
            User user = userRepository.findById(userId).orElse(null);
            if (user != null) {
                int exp = myRunningDto.getRunningChallenge() != null ? myRunningDto.getRunningChallenge().getExp() : 0;
                user.setPoint(user.getPoint() + exp);
                myRunningDto.setUser(user); // User 설정
                myRunningDto.setDaily_success(true);
                myRunningRepository.saveAndFlush(myRunningDto);
                userRepository.saveAndFlush(user);

                return "success";
            } else {
                return "fail: User not found";
            }
        } else {
            myRunningDto.setDaily_success(false);
            myRunningRepository.saveAndFlush(myRunningDto);
            return "fail";
        }
    }

}
