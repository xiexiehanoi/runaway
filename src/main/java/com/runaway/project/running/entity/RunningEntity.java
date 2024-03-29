package com.runaway.project.running.entity;


import com.runaway.project.user.entity.User;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;

@Entity
@Getter
@Setter
@NoArgsConstructor
@Table(name = "running")
public class RunningEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long runIdx;

    //private Long userIdx;

    @ManyToOne
    @JoinColumn(name = "user_idx", nullable = false)
    private User user; // 사용자 엔티티와의 관계를 나타내는 필드

    private LocalDate date;

    private LocalTime time;

    @Column(nullable = true)
    private double distance;

    private String averagePace;

    @Column(nullable = true, length = 100)
    private String runningTime;

    @OneToMany(cascade = CascadeType.ALL, orphanRemoval = true)
    @JoinColumn(name = "running_id")
    private List<LocationEntity> path;

    private int calorie;


}
