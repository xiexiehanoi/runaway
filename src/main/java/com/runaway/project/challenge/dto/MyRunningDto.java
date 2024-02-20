package com.runaway.project.challenge.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.runaway.project.user.entity.User;
import jakarta.persistence.*;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import java.sql.Timestamp;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Data
@Table(name = "my_running")
@ToString
public class MyRunningDto {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int idx;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user; // User 엔티티와의 연관 관계

    @ManyToOne(cascade = CascadeType.PERSIST)
    @JoinColumn(name = "challenge_id")
    private RunningChallengeDto runningChallenge; // RunningChallenge 엔티티와의 연관 관계

    @Column(name="start_date")
    @JsonFormat(pattern = "yyyy-MM-dd", timezone = "Asia/Seoul")
    private LocalDate startDate;

    @Column(name="end_date")
    @JsonFormat(pattern = "yyyy-MM-dd", timezone = "Asia/Seoul")
    private LocalDate endDate;
    private boolean daily_success; // 데일리 성공 여부

    @PrePersist
    public void prePersist() {
        this.startDate = LocalDate.now();
        if (this.user == null) {
            throw new IllegalArgumentException("User cannot be null.");
        }
        if (this.runningChallenge != null && this.runningChallenge.getTarget_date() != 0) {
            LocalDate endDateTime = startDate.now().plusDays(this.runningChallenge.getTarget_date()-1);
            this.endDate = endDateTime;
        }
    }


}