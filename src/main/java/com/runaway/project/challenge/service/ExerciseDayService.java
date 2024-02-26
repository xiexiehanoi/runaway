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

    @Scheduled(cron = "00 07 18 * * *")
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
                userRepository.save(user);
            } else if (isAnyDayFailed) {
                myExercise.setSuccessStatus(1);
            } else {
                myExercise.setSuccessStatus(0);
            }
            myExerciseRepository.save(myExercise);
        }
    }
}


