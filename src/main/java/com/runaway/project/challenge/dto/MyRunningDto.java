package com.runaway.project.challenge.dto;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
@Table(name = "myrunning")
public class MyRunningDto {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long idx;

    private long running_idx;


    private String userid;

    private int running_distance;

    private int running_time;

    private int success;


}
