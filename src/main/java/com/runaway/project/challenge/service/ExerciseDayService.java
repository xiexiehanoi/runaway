package com.runaway.project.challenge.service;

import com.runaway.project.challenge.dto.ExerciseChallengeDto;
import com.runaway.project.challenge.dto.ExerciseDayDto;
import com.runaway.project.challenge.dto.MyExerciseDto;
import com.runaway.project.challenge.repository.ExerciseChallengeRepository;
import com.runaway.project.challenge.repository.MyExerciseRepository;
import com.runaway.project.exercise.respository.ExerciseRepository;
import com.runaway.project.user.entity.User;
import com.runaway.project.user.repository.GradeRepository;
import com.runaway.project.user.repository.UserRepository;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.List;


enum ExerciseState {
    UNCHECKED(0), FAIL(1), SUCCESS(2);

    private final int value;

    ExerciseState(int value) {
        this.value = value;
    }
    public int getValue() {
        return value;
    }

    public static ExerciseState fromInt(int value) {
        for (ExerciseState state : ExerciseState.values()) {
            if (state.getValue() == value) {
                return state;
            }
        }
        return UNCHECKED;
    }

}

@Service
public class ExerciseDayService {

    private final MyExerciseRepository myExerciseRepository;
    private final ExerciseRepository exerciseRepository;
    private final UserRepository userRepository;
    private final GradeRepository gradeRepository;

    public ExerciseDayService(MyExerciseRepository myExerciseRepository,
                              ExerciseRepository exerciseRepository,
                              UserRepository userRepository,
                              GradeRepository gradeRepository) {
        this.myExerciseRepository = myExerciseRepository;
        this.exerciseRepository = exerciseRepository;
        this.userRepository = userRepository;
        this.gradeRepository = gradeRepository;
    }

    @Scheduled(cron = "0 0 0 * * *")
    @Transactional
    public void checkAndCompleteChallenges() {
        List<MyExerciseDto> myExercises = myExerciseRepository.findAll();

        for (MyExerciseDto myExercise : myExercises) {
            ExerciseChallengeDto challenge = myExercise.getExerciseChallengeDto();
            List<ExerciseDayDto> exerciseDays = myExercise.getExerciseDays();
            boolean isAllDaysSuccess = true;
            boolean isAnyDayFailed = false;

            for (ExerciseDayDto exerciseDay : exerciseDays) {
                if (exerciseDay.getDate().isBefore(LocalDate.now())) {
                    int totalExerciseCount = exerciseRepository.sumExerciseCountByDateAndType(
                            exerciseDay.getDate(),
                            challenge.getExercise_type(),
                            myExercise.getUser().getId()
                    );
                    System.out.println("totalExerciseCount: "+totalExerciseCount);
                    if (totalExerciseCount >= challenge.getTarget_count()) {
                        exerciseDay.setSuccessStatus(2);
                    } else {
                        exerciseDay.setSuccessStatus(1);
                        isAnyDayFailed = true;
                    }
                } else {
                    exerciseDay.setSuccessStatus(0);
                    isAllDaysSuccess = false;
                }
                System.out.println("Set successStatus to: " + exerciseDay.getSuccessStatus());
            }
            if (isAllDaysSuccess) {
                myExercise.setSuccessStatus(2);
                User user = myExercise.getUser();
                user.addPoints(challenge.getExp(), gradeRepository);
                System.out.println("점수 "+challenge.getExp() + "등급"+gradeRepository);
                userRepository.save(user);
            } else if (isAnyDayFailed) {
                myExercise.setSuccessStatus(1);
            } else {
                myExercise.setSuccessStatus(0);
            }
            myExerciseRepository.save(myExercise);
        }
    }

    @Transactional
    public boolean getResultCallenges(Long userId) {
        List<MyExerciseDto> myExercises = myExerciseRepository.findAllByUserId(userId);
        boolean isSuccess = false;

        for (MyExerciseDto myExercise : myExercises) {
            if (myExercise.getEnd_date().isBefore(LocalDate.now())) continue;

            ExerciseChallengeDto challenge = myExercise.getExerciseChallengeDto();
            List<ExerciseDayDto> exerciseDays = myExercise.getExerciseDays();

            int dayCount = 0;

            for (ExerciseDayDto exerciseDay : exerciseDays) {
                if (exerciseDay.getSuccessStatus() == ExerciseState.SUCCESS.ordinal()) {
                    dayCount += 1;
                    continue;
                } else if (exerciseDay.getSuccessStatus() == ExerciseState.FAIL.ordinal()) {
                    break;
                }

                if (exerciseDay.getDate().isBefore(LocalDate.now()) || exerciseDay.getDate().isEqual(LocalDate.now())) {
                    int totalExerciseCount = exerciseRepository.sumExerciseCountByDateAndType(
                            exerciseDay.getDate(),
                            challenge.getExercise_type(),
                            myExercise.getUser().getId()
                    );

                    if (totalExerciseCount >= challenge.getTarget_count()) {
                        exerciseDay.setSuccessStatus(ExerciseState.SUCCESS.ordinal());
                        dayCount += 1;
                    } else {
                        exerciseDay.setSuccessStatus(ExerciseState.FAIL.ordinal());
                    }
                }
            }

            if (dayCount >= myExercise.getExerciseChallengeDto().getTarget_date()) {
                myExercise.setSuccessStatus(ExerciseState.SUCCESS.ordinal());
                User user = myExercise.getUser();
                user.addPoints(challenge.getExp(), gradeRepository);
                userRepository.save(user);

                isSuccess = true;
            }

            myExerciseRepository.save(myExercise);
        }

        return isSuccess;
    }

}


