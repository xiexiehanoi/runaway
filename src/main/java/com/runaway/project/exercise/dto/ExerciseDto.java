package com.runaway.project.exercise.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.runaway.project.user.entity.User;
import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDate;

@Entity
@Data
@NoArgsConstructor
@Table(name = "exercise")
public class ExerciseDto {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long exercise_idx;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @JsonFormat(pattern = "yyyy-MM-dd", timezone = "Asia/Seoul")
    private LocalDate date;

    @Column(nullable = true)
    private int exercise_count;

    @Column(nullable = false)
    private String exercise_type;

}
