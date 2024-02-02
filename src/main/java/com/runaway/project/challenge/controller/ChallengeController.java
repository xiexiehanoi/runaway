package com.runaway.project.challenge.controller;

import com.runaway.project.challenge.dto.ExerciseDto;
import com.runaway.project.challenge.dao.ExerciseDao;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequiredArgsConstructor
public class ChallengeController {
    private final ExerciseDao exerciseDao;

    @GetMapping("/exercisechallenge/list")
    public List<ExerciseDto> list()
    {
        System.out.println("list>>");

        return exerciseDao.getAllexercise();
    }
}
