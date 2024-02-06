package com.runaway.project.challenge.controller;

import com.runaway.project.challenge.dao.RunningChallengeDao;
import com.runaway.project.challenge.dto.ExerciseChallengeDto;
import com.runaway.project.challenge.dao.ExerciseChallengeDao;

import com.runaway.project.challenge.dto.RunningChallengeDto;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequiredArgsConstructor
public class ChallengeController {
    private final ExerciseChallengeDao exerciseChallengeDao;
    private final RunningChallengeDao runningChallengeDao;

    @GetMapping("/exercisechallenge/list")
    public List<ExerciseChallengeDto> list()
    {
        System.out.println("list>>");

        return exerciseChallengeDao.getAllexercise();
    }

    @GetMapping("/runningchallenge/list")
    public List<RunningChallengeDto> list2()
    {
        return runningChallengeDao.getAllrunning();
    }
}
