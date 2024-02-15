package com.runaway.project.challenge.controller;

import com.runaway.project.challenge.dao.RunningChallengeDao;
import com.runaway.project.challenge.dto.ExerciseChallengeDto;
import com.runaway.project.challenge.dao.ExerciseChallengeDao;

import com.runaway.project.challenge.dto.MyExerciseDto;
import com.runaway.project.challenge.dto.RunningChallengeDto;
import com.runaway.project.challenge.service.ChallengeService;
import com.runaway.project.user.entity.User;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/challenge")
public class ChallengeController {
    private final ExerciseChallengeDao exerciseChallengeDao;
    private final RunningChallengeDao runningChallengeDao;
    @Autowired
    private final ChallengeService challengeService;

    @GetMapping("/exercise/list")
    public List<ExerciseChallengeDto> list()
    {
        System.out.println("list>>");

        return exerciseChallengeDao.getAllexercise();
    }

    @GetMapping("/running/list")
    public List<RunningChallengeDto> list2()
    {
        return runningChallengeDao.getAllrunning();
    }

    @PostMapping("/exercise/insert")
    public ResponseEntity<String> addexercisechallenge(@RequestBody MyExerciseDto myExerciseDto)
    {
        System.out.println("result: "+myExerciseDto);

        if (myExerciseDto == null || myExerciseDto.getExerciseChallengeDto() == null) {
            return ResponseEntity.badRequest().body("챌린지 데이터가 올바르지 않습니다.");
        }

        ExerciseChallengeDto exerciseChallengeDto = myExerciseDto.getExerciseChallengeDto();
        int targetDays = exerciseChallengeDto.getTarget_date();
        LocalDate endDateTime = LocalDate.now().plusDays(targetDays);
        LocalDate startDateTime = LocalDate.now();

        myExerciseDto.setStart_date(startDateTime);
        myExerciseDto.setEnd_date(endDateTime);

        User userEntity =challengeService.findById(myExerciseDto.getUser().getId());
        challengeService.insertExerciseChallenge(myExerciseDto, userEntity);
        return ResponseEntity.ok("챌린지 데이터가 저장되었습니다.");
    }

}
