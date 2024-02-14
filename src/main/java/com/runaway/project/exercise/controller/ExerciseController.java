package com.runaway.project.exercise.controller;

import com.runaway.project.exercise.dto.ExerciseDto;
import com.runaway.project.exercise.service.ExerciseService;
import com.runaway.project.user.entity.User;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/exercise")
public class ExerciseController {
    private final ExerciseService exerciseService;

    @PostMapping("/save")
    public void saveExerciseRecord(@RequestBody ExerciseDto exerciseDto) {
        User userEntity = exerciseService.findByUserId(exerciseDto.getUser().getId());
        exerciseService.saveExerciseRecord(exerciseDto, userEntity);
    }
}
