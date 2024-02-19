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

    public void saveExercise(ExerciseDto exerciseDto, User user) {
        ExerciseEntity exerciseEntity = new ExerciseEntity();
        exerciseEntity.setUser(user);
        exerciseEntity.setDate(exerciseDto.getDate());
        exerciseEntity.setExerciseCount(exerciseDto.getExerciseCount());
        exerciseEntity.setExerciseType(exerciseDto.getExerciseType());

        exerciseRepository.save(exerciseEntity);
    }
}
