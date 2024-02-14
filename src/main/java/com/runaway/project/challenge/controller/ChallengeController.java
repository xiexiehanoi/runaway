package com.runaway.project.challenge.controller;

import com.runaway.project.challenge.dao.RunningChallengeDao;
import com.runaway.project.challenge.dto.ExerciseChallengeDto;
import com.runaway.project.challenge.dao.ExerciseChallengeDao;

import com.runaway.project.challenge.dto.MyExerciseDto;
import com.runaway.project.challenge.dto.RunningChallengeDto;
import com.runaway.project.challenge.service.ChallengeService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/challenge")
public class ChallengeController {
    private final ExerciseChallengeDao exerciseChallengeDao;
    private final RunningChallengeDao runningChallengeDao;
    @Autowired
    private final ChallengeService challengeService;

    @GetMapping("/exercise/list")
    public List<ExerciseChallengeDto> list()
    {
        System.out.println("list>>");

        return exerciseChallengeDao.getAllexercise();
    }

    @GetMapping("/running/list")
    public List<RunningChallengeDto> list2()
    {
        return runningChallengeDao.getAllrunning();
    }

    @PostMapping("/exercise/insert")
    public void addexercisechallenge(@RequestBody MyExerciseDto myExerciseDto)
    {
        System.out.println("result: "+myExerciseDto);
        challengeService.insertExerciseChallenge(myExerciseDto);
    }

}
