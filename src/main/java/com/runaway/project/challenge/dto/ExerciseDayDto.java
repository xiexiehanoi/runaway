package com.runaway.project.challenge.dto;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.runaway.project.challenge.dto.MyExerciseDto;
import jakarta.persistence.*;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import java.time.LocalDate;

@Entity
@Getter
@Setter
@ToString(exclude = "myExercise")
@Table(name = "exercise_day")
public class ExerciseDayDto {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private LocalDate date;
    private int successStatus;

    @ManyToOne
    @JoinColumn(name = "idx")
    @JsonBackReference
    private MyExerciseDto myExercise;

}
