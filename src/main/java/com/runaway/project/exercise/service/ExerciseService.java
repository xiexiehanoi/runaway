package com.runaway.project.exercise.service;

import com.runaway.project.exercise.dto.ExerciseDto;
import com.runaway.project.exercise.respository.ExerciseRepository;
import com.runaway.project.user.entity.User;
import com.runaway.project.user.repository.UserRepository;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import software.amazon.ion.Timestamp;

import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class ExerciseService {
    private final ExerciseRepository exerciseRepository;
    private final UserRepository userRepository;

    public User findByUserId(Long userId) {
        Optional<User> OptionalUserEntity = userRepository.findById(userId);
        if (OptionalUserEntity.isPresent()) {
            return OptionalUserEntity.get();
        } else {
            throw new EntityNotFoundException("User not found for id: " + userId);
        }
    }

    public void saveExerciseRecord(ExerciseDto exerciseDto, User userEntity) {

        exerciseDto.setUser(userEntity);
        exerciseDto.setDate(exerciseDto.getDate()); ;
        exerciseDto.setExercise_count(exerciseDto.getExercise_count());
        exerciseDto.setExercise_type(exerciseDto.getExercise_type());
        exerciseRepository.save(exerciseDto);
    }
}
