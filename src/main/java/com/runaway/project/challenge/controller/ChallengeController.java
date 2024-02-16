package com.runaway.project.challenge.controller;

import com.runaway.project.challenge.dao.RunningChallengeDao;
import com.runaway.project.challenge.dto.ExerciseChallengeDto;
import com.runaway.project.challenge.dao.ExerciseChallengeDao;

import com.runaway.project.challenge.dto.MyExerciseDto;
import com.runaway.project.challenge.dto.MyRunningDto;
import com.runaway.project.challenge.dto.RunningChallengeDto;
import com.runaway.project.challenge.service.ChallengeService;
import com.runaway.project.exercise.entity.ExerciseEntity;
import com.runaway.project.user.entity.User;
import com.runaway.project.user.service.UserService;
import jakarta.servlet.http.HttpServletRequest;
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
    private final ChallengeService challengeService;
    private final UserService userService;

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
    public ResponseEntity<String> addExerciseChallenge(HttpServletRequest request, @RequestBody MyExerciseDto myExerciseDto)
    {
        System.out.println("result: "+myExerciseDto.toString());

        if (myExerciseDto == null || myExerciseDto.getExerciseChallengeDto() == null) {
            return ResponseEntity.badRequest().body("챌린지 데이터가 올바르지 않습니다.");
        }

        User user = userService.getUserByReqeust(request);
        if (user == null) ResponseEntity.badRequest().body("Error in token");
        myExerciseDto.setUser(user);

        ExerciseChallengeDto exerciseChallengeDto = myExerciseDto.getExerciseChallengeDto();
        int targetDays = exerciseChallengeDto.getTarget_date();
        LocalDate startDateTime = LocalDate.now();
        LocalDate endDateTime = startDateTime.plusDays(targetDays);

        myExerciseDto.setStart_date(startDateTime);
        myExerciseDto.setEnd_date(endDateTime);

        challengeService.insertExerciseChallenge(myExerciseDto);
        return ResponseEntity.ok("챌린지 데이터가 저장되었습니다.");
    }

    @PostMapping("/running/insert")
    public ResponseEntity<String> addRunningChallenge(HttpServletRequest request, @RequestBody MyRunningDto myRunningDto)
    {
        System.out.println("result: "+myRunningDto);

        if (myRunningDto == null || myRunningDto.getRunningChallenge() == null) {
            return ResponseEntity.badRequest().body("챌린지 데이터가 올바르지 않습니다.");
        }

        User user = userService.getUserByReqeust(request);
        if (user == null) ResponseEntity.badRequest().body("Error in token");
        myRunningDto.setUser(user);

        RunningChallengeDto runningChallengeDto = myRunningDto.getRunningChallenge();
        int targetDays = runningChallengeDto.getTarget_date();
        LocalDate startDateTime = LocalDate.now();
        LocalDate endDateTime = startDateTime.plusDays(targetDays);

        myRunningDto.setStart_date(startDateTime);
        myRunningDto.setEnd_date(endDateTime);

        challengeService.insertRunningChallenge(myRunningDto);
        return ResponseEntity.ok("챌린지 데이터가 저장되었습니다.");
    }

    @GetMapping("/mychallengelist")
    public List<?> getMyChallengeList(HttpServletRequest request) {
        User user = userService.getUserByReqeust(request);
        if (user == null) ResponseEntity.badRequest().body("Error in token");

        List<Object> myChallengeList = challengeService.getAllMyChallengesList(user.getId());
        return myChallengeList;
    }

}
