package com.runaway.project.challenge.dto;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
@Table(name="myexercise")
public class MyExerciseDto {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long idx;

    private long exercise_idx;

    private long userid;

    private int buppy_count;

    private int squat_count;

    private int success;
}
