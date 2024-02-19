package com.runaway.project.exercise.dto;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

import java.time.LocalDate;

@Data
@NoArgsConstructor
@ToString
public class ExerciseDto {

    private Long exerciseIdx;

    private Long userId;

    private LocalDate date;

    private int exerciseCount;

    private String exerciseType;

}
