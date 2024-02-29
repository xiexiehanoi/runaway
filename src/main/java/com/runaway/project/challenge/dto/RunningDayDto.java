package com.runaway.project.challenge.dto;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import java.time.LocalDate;

@Entity
@Getter
@Setter
@ToString(exclude = "myRunning")
@Table(name = "running_day")
public class RunningDayDto {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private LocalDate date;
    private int successStatus;

    @ManyToOne
    @JoinColumn(name = "idx")
    @JsonBackReference
    private MyRunningDto myRunning;

}
