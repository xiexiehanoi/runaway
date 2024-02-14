package com.runaway.project.challenge.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.runaway.project.user.entity.User;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.sql.Timestamp;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Getter
@Setter
@Table(name="my_exercise")
public class MyExerciseDto {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int idx;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    @JsonFormat(pattern = "yyyy-MM-dd", timezone = "Asia/Seoul")
    private Timestamp start_date;

    @JsonFormat(pattern = "yyyy-MM-dd", timezone = "Asia/Seoul")
    private Timestamp end_date;

    private boolean success;

    @ManyToOne
    @JoinColumn(name = "exerciseChallenge_id")
    private ExerciseChallengeDto exerciseChallengeDto;

    @PrePersist
    public void prePersist() {
        this.start_date = Timestamp.valueOf(LocalDateTime.now()); // 시작 날짜를 현재 시간으로 설정
        if (this.exerciseChallengeDto != null && this.exerciseChallengeDto.getTarget_date() > 0) {
            // 종료 날짜 계산
            LocalDateTime endDateTime = LocalDateTime.now().plusDays(this.exerciseChallengeDto.getTarget_date());
            this.end_date = Timestamp.valueOf(endDateTime);
        }
    }
}