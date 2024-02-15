package com.runaway.project.exercise.service;

import com.runaway.project.exercise.dto.ExerciseDto;
import com.runaway.project.exercise.entity.ExerciseEntity;
import com.runaway.project.exercise.respository.ExerciseRepository;
import com.runaway.project.user.entity.User;
import com.runaway.project.user.repository.UserRepository;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import software.amazon.ion.Timestamp;

import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class ExerciseService {
    private final ExerciseRepository exerciseRepository;
    private final UserRepository userRepository;

     public User findById(Long userId) {
        Optional<User> OptionalUserEntity = userRepository.findById(userId);
        if (OptionalUserEntity.isPresent()) {
            return OptionalUserEntity.get();
        } else {
            throw new EntityNotFoundException("User not found for id: " + userId);
        }
    }

    public void saveExercise(ExerciseDto exerciseDto, User userEntity) {
        ExerciseEntity exerciseEntity = new ExerciseEntity();
        exerciseEntity.setUser(userEntity);
        exerciseEntity.setDate(exerciseDto.getDate());
        exerciseEntity.setExerciseCount(exerciseDto.getExerciseCount());
        exerciseEntity.setExerciseType(exerciseDto.getExerciseType());

        exerciseRepository.save(exerciseEntity);
    }
}
