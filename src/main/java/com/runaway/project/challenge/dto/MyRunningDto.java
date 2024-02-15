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
@Table(name = "my_running")
public class MyRunningDto {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int idx;

    @ManyToOne
    @JoinColumn(name = "user_id", referencedColumnName = "id")
    private User user; // User 엔티티와의 연관 관계

    @ManyToOne
    @JoinColumn(name = "challenge_id", referencedColumnName = "id")
    private RunningChallengeDto runningChallenge; // RunningChallenge 엔티티와의 연관 관계

    @JsonFormat(pattern = "yyyy-MM-dd", timezone = "Asia/Seoul")
    private LocalDate start_date;
    @JsonFormat(pattern = "yyyy-MM-dd", timezone = "Asia/Seoul")
    private LocalDate end_date;
    private boolean daily_success; // 데일리 성공 여부

    @PrePersist
    public void prePersist() {
        this.start_date = LocalDate.now();
        if (this.user == null) {
            throw new IllegalArgumentException("User cannot be null.");
        }
        if (this.runningChallenge != null && this.runningChallenge.getTarget_date() != 0) {
            LocalDate endDateTime = LocalDate.now().plusDays(this.runningChallenge.getTarget_date());
            this.end_date = endDateTime;
        }
    }


}