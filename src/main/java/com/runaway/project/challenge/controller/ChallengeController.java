package com.runaway.project.challenge.controller;

import com.runaway.project.challenge.dao.RunningChallengeDao;
import com.runaway.project.challenge.dto.ExerciseChallengeDto;
import com.runaway.project.challenge.dao.ExerciseChallengeDao;

import com.runaway.project.challenge.dto.MyExerciseDto;
import com.runaway.project.challenge.dto.RunningChallengeDto;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/challenge")
public class ChallengeController {
    private final ExerciseChallengeDao exerciseChallengeDao;
    private final RunningChallengeDao runningChallengeDao;


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

    @PostMapping("/myexercise/insert")
    public void insertmyexercise(@RequestBody MyExerciseDto dto)
    {
        exerciseChallengeDao.insertMyExercise(dto);
    }

}
