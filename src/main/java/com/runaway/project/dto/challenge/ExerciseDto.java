package com.runaway.project.dto.challenge;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
@Table(name = "exercise")
public class ExerciseDto {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long idx;

    private String name;

    private int end;

    private int count;

    private int exp;

}
