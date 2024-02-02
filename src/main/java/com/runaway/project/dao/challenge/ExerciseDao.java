package com.runaway.project.dao.challenge;

import com.runaway.project.dto.challenge.ExerciseDto;
import com.runaway.project.repository.challenge.ExerciseRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
@AllArgsConstructor
public class ExerciseDao {
    private ExerciseRepository exerciseRepository;

    public List<ExerciseDto> getAllexercise()
    {
        return exerciseRepository.findAll();
    }
}
