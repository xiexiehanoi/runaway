package com.runaway.project.exercise.respository;


import com.runaway.project.exercise.entity.ExerciseEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ExerciseRepository extends JpaRepository<ExerciseEntity,Long> {

}