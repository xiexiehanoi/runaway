package com.runaway.project.challenge.dto;

import com.runaway.project.user.entity.User;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.sql.Timestamp;
import java.time.LocalDateTime;

@Entity
@Getter
@Setter
@Table(name = "myrunning")
public class MyRunningDto {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int idx;

    @ManyToOne
    @JoinColumn(name = "userId", referencedColumnName = "id")
    private User userid; // User 엔티티와의 연관 관계

    @ManyToOne
    @JoinColumn(name = "challengeId", referencedColumnName = "id")
    private RunningChallengeDto runningChallenge; // RunningChallenge 엔티티와의 연관 관계

    private Timestamp start_date;
    private Timestamp end_date;
    private boolean daily_success; // 데일리 성공 여부

    @PrePersist
    private void prePersist() {
        this.start_date = Timestamp.valueOf(LocalDateTime.now()); // 시작 날짜를 현재 시간으로 설정
        if (this.runningChallenge != null && this.runningChallenge.getTarget_date() > 0) {
            // 종료 날짜 계산
            LocalDateTime endDateTime = LocalDateTime.now().plusDays(this.runningChallenge.getTarget_date());
            this.end_date = Timestamp.valueOf(endDateTime);
        }
    }


}
