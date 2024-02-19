package com.runaway.project.exercise.controller;

import com.runaway.project.exercise.dto.ExerciseDto;
import com.runaway.project.exercise.entity.ExerciseEntity;
import com.runaway.project.exercise.service.ExerciseService;
import com.runaway.project.user.service.UserService;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.runaway.project.user.entity.User;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/exercise")
public class ExerciseController {

    private final ExerciseService exerciseService;
    private final UserService userService;

    @PostMapping("/save")
    public ResponseEntity<String> saveExercise(HttpServletRequest request, @RequestBody ExerciseDto exerciseDto) {
        User user = userService.getUserByReqeust(request);
        if (user == null) return ResponseEntity.badRequest().body("Error in token");

        exerciseService.saveExercise(exerciseDto, user);
        return ResponseEntity.ok("운동 데이터가 저장되었습니다.");
    }
}

