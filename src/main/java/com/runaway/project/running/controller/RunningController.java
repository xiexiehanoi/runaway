package com.runaway.project.running.controller;


import com.runaway.project.challenge.dto.MyRunningDto;
import com.runaway.project.challenge.service.ChallengeService;
import com.runaway.project.running.dto.RunningDto;
import com.runaway.project.running.service.RunningService;
import com.runaway.project.user.entity.User;
import com.runaway.project.user.service.UserService;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/running")
public class RunningController {
    private final RunningService runningService;
    private final ChallengeService challengeService;
    private final UserService userService;

    @Transactional
    @PostMapping("/save")
    public void saveRunningRecord(HttpServletRequest request, @RequestBody RunningDto runningDto) {
        User user = userService.getUserByReqeust(request);
        if (user == null) ResponseEntity.badRequest().body("Error in token");
        User userEntity = runningService.findById(user.getId());

        runningService.calcAndSetCalorie(user.getWeight(), runningDto);
        runningService.saveRunningRecord(runningDto, userEntity);

        LocalDate today = LocalDate.now();

        List<MyRunningDto> currentChallenges = runningService.findCurrentChallengesByUserId(user.getId(), today);
        if (!currentChallenges.isEmpty()) {
            for (MyRunningDto challenge : currentChallenges) {
                challengeService.evaluateRunningChallenge((long) challenge.getIdx(), userEntity.getId());
            }
        }
    }
}
