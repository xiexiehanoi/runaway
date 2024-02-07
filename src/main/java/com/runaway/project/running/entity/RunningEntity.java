package com.runaway.project.running.entity;

import com.runaway.project.running.dto.LocationDto;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Entity
@Getter
@Setter
@NoArgsConstructor
@Table(name = "running")
public class RunningEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "running_id")
    private Long idx;

    @Column(nullable = true)
    private double distance;

    @OneToMany(cascade = CascadeType.ALL, orphanRemoval = true)
    @JoinColumn(name = "running_id")
    private List<LocationEntity> path; ;

    @Column(nullable = true, length = 100)
    private String runningTime;


}
