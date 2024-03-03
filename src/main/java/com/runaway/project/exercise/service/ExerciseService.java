package com.runaway.project.exercise.service;

import com.runaway.project.exercise.dto.ExerciseDto;
import com.runaway.project.exercise.entity.ExerciseEntity;
import com.runaway.project.exercise.respository.ExerciseRepository;
import com.runaway.project.user.entity.User;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class ExerciseService {

    private final ExerciseRepository exerciseRepository;

    private double calculateCalories(int count, String exerciseType) {
        switch (exerciseType) {
            case "squat":
                return count * 1.2;
            case "situp":
                return count * 0.9;
            case "pushup":
                return count * 0.7;
            default:
                return 0;
        }
    }

    public void saveExercise(ExerciseDto exerciseDto, User user) {
        ExerciseEntity exerciseEntity = new ExerciseEntity();
        exerciseEntity.setUser(user);
        exerciseEntity.setDate(exerciseDto.getDate());
        exerciseEntity.setExerciseCount(exerciseDto.getExerciseCount());
        exerciseEntity.setExerciseType(exerciseDto.getExerciseType());
        // 칼로리 계산 후 설정
        double calories = calculateCalories(exerciseDto.getExerciseCount(), exerciseDto.getExerciseType());
        exerciseEntity.setCalorie(calories);

        exerciseRepository.save(exerciseEntity);
    }


}
