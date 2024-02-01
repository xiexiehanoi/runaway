package com.runaway.project.dto.challenge;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
@Entity
@Getter
@Setter
@Table(name = "running")
public class RunningDto {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long idx;

    private String name;

    private int end;

    private int distance;

    private int exp;
}

