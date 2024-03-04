package com.runaway.project.challenge.controller;

import com.runaway.project.challenge.dao.RunningChallengeDao;
import com.runaway.project.challenge.dto.ExerciseChallengeDto;
import com.runaway.project.challenge.dao.ExerciseChallengeDao;

import com.runaway.project.challenge.dto.MyExerciseDto;
import com.runaway.project.challenge.dto.MyRunningDto;
import com.runaway.project.challenge.dto.RunningChallengeDto;
import com.runaway.project.challenge.repository.MyExerciseRepository;
import com.runaway.project.challenge.repository.MyRunningRepository;
import com.runaway.project.challenge.service.ChallengeService;
import com.runaway.project.user.entity.User;
import com.runaway.project.user.service.UserService;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
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
    private final MyRunningRepository myRunningRepository;
    private final MyExerciseRepository myExerciseRepository;

    @GetMapping("/exercise/list")
    public List<ExerciseChallengeDto> exerciseList()
    {
        return exerciseChallengeDao.getAllexercise();
    }

    @GetMapping("/running/list")
    public List<RunningChallengeDto> runningList()
    {
        return runningChallengeDao.getAllrunning();
    }

    @PostMapping("/exercise/insert")
    public ResponseEntity<String> addExerciseChallenge(HttpServletRequest request, @RequestBody MyExerciseDto myExerciseDto) {
//        System.out.println("result: " + myExerciseDto.toString());

        if (myExerciseDto == null || myExerciseDto.getExerciseChallengeDto() == null) {
            return ResponseEntity.badRequest().body("챌린지 데이터가 올바르지 않습니다.");
        }

        User user = userService.getUserByReqeust(request);
        if (user == null) {
            return ResponseEntity.badRequest().body("Error in token");
        }
        myExerciseDto.setUser(user);

        ExerciseChallengeDto exerciseChallengeDto = myExerciseDto.getExerciseChallengeDto();
        int targetDays = exerciseChallengeDto.getTarget_date();
        LocalDate startDateTime = LocalDate.now();
        LocalDate endDateTime = startDateTime.plusDays(targetDays);

//        System.out.println("ednDateTime:" + endDateTime);
        myExerciseDto.setStart_date(startDateTime);
        myExerciseDto.setEnd_date(endDateTime);

        List<MyExerciseDto> existChallenges = myExerciseRepository.findAllActiveByUserIdAndExerciseType(user.getId(), myExerciseDto.getExerciseChallengeDto().getExercise_type());
        if (!existChallenges.isEmpty()) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body("이미 해당 운동에관한 챌린지가 있습니다.");
        }

        challengeService.insertExerciseChallenge(myExerciseDto);
        return ResponseEntity.ok("챌린지 데이터가 저장되었습니다.");
    }

    @PostMapping("/running/insert")
    public ResponseEntity<String> addRunningChallenge(HttpServletRequest request, @RequestBody MyRunningDto myRunningDto)
    {
//        System.out.println("result: "+myRunningDto);

        if (myRunningDto == null || myRunningDto.getRunningChallenge() == null) {
            return ResponseEntity.badRequest().body("챌린지 데이터가 올바르지 않습니다.");
        }

        User user = userService.getUserByReqeust(request);
        if (user == null) ResponseEntity.badRequest().body("Error in token");
        myRunningDto.setUser(user);

        RunningChallengeDto runningChallengeDto = myRunningDto.getRunningChallenge();
//        System.out.println("결과: "+runningChallengeDto);
        int targetDays = runningChallengeDto.getTarget_date();
        LocalDate startDateTime = LocalDate.now();
        LocalDate endDateTime = startDateTime.plusDays(targetDays);

        if (!myRunningRepository.findAllByUserIdAndEndDateGreaterThan(user.getId(), LocalDate.now()).isEmpty()) {
            return ResponseEntity.badRequest().body("\"You can add a new challenge after the current challenge ends.");
        }
        myRunningDto.setStartDate(startDateTime);
        myRunningDto.setEndDate(endDateTime);


        challengeService.insertRunningChallenge(myRunningDto, user.getId());
        return ResponseEntity.ok("챌린지 데이터가 저장되었습니다.");
    }

    @GetMapping("/challengemain/mychallengelist")
    public List<?> getMyChallengeList(HttpServletRequest request) {
        User user = userService.getUserByReqeust(request);
        System.out.println(user);
        if (user == null) ResponseEntity.badRequest().body("Error in token");

        List<?> myChallengeList = challengeService.getAllMyChallengesList(user.getId());

        return myChallengeList;
    }

    @GetMapping("/challengemain/currentMonthMychallengelist")
    public List<?> getCurrentMonthMyChallengeList(HttpServletRequest request) {
        User user = userService.getUserByReqeust(request);
        System.out.println(user);
        if (user == null) ResponseEntity.badRequest().body("Error in token");

        List<?> currentMonthMyChallengeList = challengeService.getAllCurrentMonthMyChallengesList(user.getId());

        return currentMonthMyChallengeList;
    }

}
