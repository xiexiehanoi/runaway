package com.runaway.project.challenge.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.runaway.project.user.entity.User;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@Setter
@ToString(exclude = "exerciseDays")
@Table(name="my_exercise")
public class MyExerciseDto {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int idx;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    @JsonFormat(pattern = "yyyy-MM-dd", timezone = "Asia/Seoul")
    private LocalDate start_date;

    @JsonFormat(pattern = "yyyy-MM-dd", timezone = "Asia/Seoul")
    private LocalDate end_date;

    private int successStatus;

    @ManyToOne
    @JoinColumn(name = "exerciseChallenge_id")
    private ExerciseChallengeDto exerciseChallengeDto;

    @OneToMany(mappedBy = "myExercise", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonManagedReference
    private List<ExerciseDayDto> exerciseDays = new ArrayList<>();

    public void generateExerciseDays() {
        LocalDate currentDay = this.start_date;
        while (!currentDay.isAfter(this.end_date)) {
            ExerciseDayDto exerciseDay = new ExerciseDayDto();
            exerciseDay.setDate(currentDay);
            exerciseDay.setMyExercise(this);
            exerciseDays.add(exerciseDay);
            currentDay = currentDay.plusDays(1);
        }
    }

    @PrePersist
    public void prePersist() {
        this.start_date = LocalDate.now();
        if (this.user == null) {
            throw new IllegalArgumentException("User cannot be null.");
        }
        if (this.exerciseChallengeDto != null && this.exerciseChallengeDto.getTarget_date() != 0) {
            LocalDate endDateTime = start_date.plusDays(this.exerciseChallengeDto.getTarget_date()-1);
            this.end_date = endDateTime;
        }
        generateExerciseDays();
    }
}