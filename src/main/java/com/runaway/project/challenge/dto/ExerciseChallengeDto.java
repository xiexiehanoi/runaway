package com.runaway.project.challenge.dto;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
@Table(name = "exercisechallenge")
public class ExerciseChallengeDto {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int Id;
    private int targetCount;
    private int targetDate;
    private String exerciseType;
    private int exp;

}
