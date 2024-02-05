package com.runaway.project.challenge.controller;

import com.runaway.project.challenge.dao.RunningDao;
import com.runaway.project.challenge.dto.ExerciseDto;
import com.runaway.project.challenge.dao.ExerciseDao;

import com.runaway.project.challenge.dto.RunningDto;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequiredArgsConstructor
public class ChallengeController {
    private final ExerciseDao exerciseDao;
    private final RunningDao runningDao;

    @GetMapping("/exercisechallenge/list")
    public List<ExerciseDto> list()
    {
        System.out.println("list>>");

        return exerciseDao.getAllexercise();
    }

    @GetMapping("/runningchallenge/list")
    public List<RunningDto> list2()
    {
        return runningDao.getAllrunning();
    }
}
