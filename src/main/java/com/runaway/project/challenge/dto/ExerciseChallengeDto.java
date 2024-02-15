package com.runaway.project.challenge.dto;

import jakarta.persistence.*;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

@Entity
@Data
@Table(name = "exercise_challenge")
public class ExerciseChallengeDto {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int Id;
    private int target_count;
    private int target_date;
    private String exercise_type;
    private int exp;

}
