package com.runaway.project.exercise.entity;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.runaway.project.user.entity.User;
import jakarta.persistence.*;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Entity
@Data
@NoArgsConstructor
@Table(name = "exercise")
public class ExerciseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long exerciseIdx;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @JsonFormat(pattern = "yyyy-MM-dd", timezone = "Asia/Seoul")
    private LocalDate date;

    @Column(nullable = true)
    private int exerciseCount;

    @Column(nullable = false)
    private String exerciseType;

    @Column(nullable = true)
    private Integer calorie;
}
