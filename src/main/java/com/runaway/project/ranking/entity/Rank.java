package com.runaway.project.ranking.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Entity
@Data
@Table(name = "ranking_list")
@NoArgsConstructor
public class Rank {

    @Id
    @Column(name = "user_id")
    private Long userId;

    @Column(name = "ranking")
    private Integer ranking;

    @Column(name = "date_time")
    private LocalDateTime dateTime;

    @Column(name = "previous_rank", nullable = true)
    private Integer previousRank;
}