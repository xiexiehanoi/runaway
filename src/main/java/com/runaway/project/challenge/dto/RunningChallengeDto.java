package com.runaway.project.challenge.dto;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
@Entity
@Getter
@Setter
@Table(name = "runningchallenge")
public class RunningChallengeDto {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long idx;

    private String name;

    private int end;

    private int distance;

    private int exp;
}

