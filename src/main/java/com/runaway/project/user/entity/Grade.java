package com.runaway.project.user.entity;

import jakarta.persistence.*;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@NoArgsConstructor
@Table(name = "grade")
public class Grade {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "level", length = 20, nullable = false, unique = true)
    private String level;
    @Column(name ="min-point")
    private int minPoint;
    @Column(name ="max-point")
    private int maxPoint;

    @Builder
    public Grade(Long id, String level, int minPoint, int maxPoint) {
        this.id = id;
        this.level = level;
        this.minPoint = minPoint;
        this.maxPoint = maxPoint;
    }
}
