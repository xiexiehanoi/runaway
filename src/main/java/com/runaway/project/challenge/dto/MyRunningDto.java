package com.runaway.project.challenge.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.runaway.project.user.entity.User;
import jakarta.persistence.*;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import java.sql.Timestamp;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Data
@Table(name = "my_running")
@ToString(exclude = "runningDays")
public class MyRunningDto {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int idx;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user; // User 엔티티와의 연관 관계

    @ManyToOne
    @JoinColumn(name = "runningChallenge_id")
    private RunningChallengeDto runningChallenge; // RunningChallenge 엔티티와의 연관 관계

    @Column(name="start_date")
    @JsonFormat(pattern = "yyyy-MM-dd", timezone = "Asia/Seoul")
    private LocalDate startDate;

    @Column(name="end_date")
    @JsonFormat(pattern = "yyyy-MM-dd", timezone = "Asia/Seoul")
    private LocalDate endDate;

    private int successStatus;

    @Column(name = "daily_success")
    private boolean isDailySuccess; // 데일리 성공 여부


    @OneToMany(mappedBy = "myRunning", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonManagedReference
    private List<RunningDayDto> runningDays = new ArrayList<>();

    public void generateRunningDays() {
        LocalDate currentDay = this.startDate;
        while (!currentDay.isAfter(this.endDate)) {
            RunningDayDto runningDay  = new RunningDayDto();
            runningDay.setDate(currentDay);
            runningDay.setMyRunning(this);;
            runningDays.add(runningDay);
            currentDay = currentDay.plusDays(1);
        }
    }

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
        generateRunningDays();
    }


}