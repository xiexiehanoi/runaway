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
import java.util.ArrayList;
import java.util.List;
import java.util.*;


@Service
@RequiredArgsConstructor
public class ChallengeService {

    @Autowired
    private MyExerciseRepository myExerciseRepository;

    @Autowired
    private MyRunningRepository myRunningRepository;
    private final RunningRepository runningRepository;
    private final UserRepository userRepository;

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

    @Transactional
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

        Map<LocalDate, Integer> dailyTotalDistances = new HashMap<>();
        for (RunningEntity record : runningRecords) {
            LocalDate recordDate = record.getDate();
            int newDistance = (int) Math.floor(record.getDistance());

            // 같은 날짜에 여러 거리가 있으면 모두 합산
            dailyTotalDistances.merge(recordDate, newDistance, Integer::sum);

        }
        System.out.println("Daily Total Distances: " + dailyTotalDistances);

        List<Boolean> dailySuccess = new ArrayList<>();
        int successDays = 0;

        for (LocalDate date = startDate; date.isBefore(endDate.plusDays(1)); date = date.plusDays(1)) {
            Integer totalDistance = dailyTotalDistances.getOrDefault(date, 0);

            // 각 날짜별 총 거리가 목표 거리 이상인지 확인
            boolean daySuccess = totalDistance >= targetDistance;
            dailySuccess.add(daySuccess);

            if (!daySuccess) {
                // 하루라도 목표를 달성하지 못하면 실패로 처리
                myRunningRepository.updateDailySuccessById(false, myRunningDto.getIdx());
                return "fail";
            } else {
                successDays++;
            }
        }


        System.out.println("성공일수 :"+successDays);
        if (successDays >= targetDays) {
            User user = userRepository.findById(userId).orElse(null);
            if (user != null) {
                int exp = myRunningDto.getRunningChallenge() != null ? myRunningDto.getRunningChallenge().getExp() : 0;
                user.setPoint(user.getPoint() + exp);
                myRunningDto.setUser(user); // User 설정
                myRunningRepository.updateDailySuccessById(true, myRunningDto.getIdx());
                userRepository.saveAndFlush(user);

                return "success";
            } else {
                return "fail: User not found";
            }
        } else {
            myRunningRepository.updateDailySuccessById(false, myRunningDto.getIdx());
            return "fail";
        }
    }
}
