package com.runaway.project.challenge.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.runaway.project.user.entity.User;
import jakarta.persistence.*;
import lombok.Data;

import java.sql.Timestamp;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Data
@Table(name="my_exercise")
public class MyExerciseDto {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int idx;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    @JsonFormat(pattern = "yyyy-MM-dd", timezone = "Asia/Seoul")
    private LocalDate start_date;

    @JsonFormat(pattern = "yyyy-MM-dd", timezone = "Asia/Seoul")
    private LocalDate end_date;

    private boolean success;

    @ManyToOne
    @JoinColumn(name = "exerciseChallenge_id")
    private ExerciseChallengeDto exerciseChallengeDto;

    @PrePersist
    public void prePersist() {
        this.start_date = LocalDate.now();
        if (this.user == null) {
            throw new IllegalArgumentException("User cannot be null.");
        }
        if (this.exerciseChallengeDto != null && this.exerciseChallengeDto.getTarget_date() != 0) {
            LocalDate endDateTime = LocalDate.now().plusDays(this.exerciseChallengeDto.getTarget_date());
            this.end_date = endDateTime;
        }
    }
}