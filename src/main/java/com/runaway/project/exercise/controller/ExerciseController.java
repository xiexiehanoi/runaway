package com.runaway.project.exercise.controller;

import com.runaway.project.exercise.dto.ExerciseDto;
import com.runaway.project.exercise.service.ExerciseService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.runaway.project.user.entity.User;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/exercise")
public class ExerciseController {

    private final ExerciseService exerciseService;

    @PostMapping("/save")
    public ResponseEntity<String> saveExercise(@RequestBody ExerciseDto exerciseDto) {
        User userEntity =exerciseService.findById(exerciseDto.getUserId());
        exerciseService.saveExercise(exerciseDto,userEntity);
        return ResponseEntity.ok("운동 데이터가 저장되었습니다.");
    }
}
