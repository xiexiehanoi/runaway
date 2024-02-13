package com.runaway.project.challenge.dto;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.sql.Timestamp;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

@Entity
@Getter
@Setter
@Table(name="myexercise")
public class MyExerciseDto {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int Id;
    private int userId;
    private Timestamp startDate;
    private Timestamp endDate;
    private LocalDate exerciseDate;
    private boolean dailySuccess;

    @ManyToOne
    @JoinColumn(name = "exerciseId", referencedColumnName = "id")
    private ExerciseChallengeDto exerciseChallengeDto;

    @PrePersist
    private void prePersist() {
        this.startDate = Timestamp.valueOf(LocalDateTime.now());
        if (this.exerciseChallengeDto != null) {
            LocalDateTime endDateTime = LocalDateTime.now().plusDays(this.exerciseChallengeDto.getTargetDate());
            this.endDate = Timestamp.valueOf(endDateTime);
        }
        this.exerciseDate = LocalDate.now();
    }

    public String getFormattedStartDate() {
        return startDate.toLocalDateTime().format(DateTimeFormatter.ofPattern("yyyy-MM-dd"));
    }

    // 생성자, getter, setter 생략
}
