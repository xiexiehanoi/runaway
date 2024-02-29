package com.runaway.project.challenge.service;

import com.runaway.project.challenge.dto.*;
import com.runaway.project.challenge.repository.MyRunningRepository;
import com.runaway.project.running.repository.RunningRepository;
import com.runaway.project.user.entity.User;
import com.runaway.project.user.repository.GradeRepository;
import com.runaway.project.user.repository.UserRepository;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.List;

@Service
public class RunningDayService {

    private final MyRunningRepository myRunningRepository;
    private final RunningRepository runningRepository;
    private final UserRepository userRepository;
    private final GradeRepository gradeRepository;

    public RunningDayService(MyRunningRepository myRunningRepository,
                              RunningRepository runningRepository,
                              UserRepository userRepository,
                              GradeRepository gradeRepository) {
        this.myRunningRepository = myRunningRepository;
        this.runningRepository = runningRepository;
        this.userRepository = userRepository;
        this.gradeRepository = gradeRepository;
    }

    @Scheduled(cron = "0 0 0 * * *")
    @Transactional
    public void checkAndCompleteChallenges() {
        List<MyRunningDto> myRunnings = myRunningRepository.findAll();

        for (MyRunningDto myRunning : myRunnings) {
            RunningChallengeDto challenge = myRunning.getRunningChallenge();
            List<RunningDayDto> runningDays = myRunning.getRunningDays();
            boolean isAllDaysSuccess = true;
            boolean isAnyDayFailed = false;

            for (RunningDayDto runningDay : runningDays) {
                if (runningDay.getDate().isBefore(LocalDate.now())) {
                    int totalRunningDistance = runningRepository.sumRunningDistanceByDate(
                            runningDay.getDate(),
                            myRunning.getUser().getId()
                    );
                    System.out.println("totalRunningDistance: "+totalRunningDistance);
                    if (totalRunningDistance >= challenge.getDistance()) {
                        runningDay.setSuccessStatus(2);
                    } else {
                        runningDay.setSuccessStatus(1);
                        isAnyDayFailed = true;
                    }
                } else {
                    runningDay.setSuccessStatus(0);
                    isAllDaysSuccess = false;
                }
                System.out.println("Set successStatus to: " + runningDay.getSuccessStatus());
            }
            if (isAllDaysSuccess) {
                myRunning.setSuccessStatus(2);
                User user = myRunning.getUser();
                user.addPoints(challenge.getExp(), gradeRepository);
                userRepository.save(user);
            } else if (isAnyDayFailed) {
                myRunning.setSuccessStatus(1);
            } else {

                myRunning.setSuccessStatus(0);
            }
            myRunningRepository.save(myRunning);
        }
    }
}


