package com.runaway.project.challenge.dao;


import com.runaway.project.challenge.dto.ExerciseDto;
import com.runaway.project.challenge.repository.ExerciseRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
@AllArgsConstructor
public class ExerciseDao {
    private ExerciseRepository exerciseRepository;

    public List<ExerciseDto> getAllexercise() {
        return exerciseRepository.findAll();
    }
}
