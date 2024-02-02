package com.runaway.project.controller;

import com.runaway.project.dao.challenge.ExerciseDao;
import com.runaway.project.dto.challenge.ExerciseDto;
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
