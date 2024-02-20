package com.runaway.project.challenge.dto;

import com.runaway.project.challenge.dto.MyExerciseDto;
import jakarta.persistence.*;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import java.time.LocalDate;

@Entity
@Getter
@Setter
@ToString
@Table(name = "exercise_day")
public class ExerciseDayDto {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private LocalDate date;
    private int successStatus;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "idx")
    private MyExerciseDto myExercise;

}
