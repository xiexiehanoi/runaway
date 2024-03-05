package com.runaway.project.profile.controller;


import com.runaway.project.profile.service.ProfileService;
import com.runaway.project.running.entity.RunningEntity;
import com.runaway.project.user.entity.User;
import com.runaway.project.user.service.UserService;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/profile")
public class ProfileController {
    private final ProfileService profileService;
    private final UserService userService;


    @GetMapping("running/record")
    public List<RunningEntity> getRunningRecord(HttpServletRequest request){
        User user = userService.getUserByReqeust(request);
        if (user == null) ResponseEntity.badRequest().body("Error in token");
        Long userId=user.getId();
        System.out.println(profileService.findByUserId(user.getId()).toString());
        return profileService.findByUserId(userId);

    }

    @GetMapping("running/detail")
    public RunningEntity getRunningRecordDetail(@RequestParam Long runIdx){
        System.out.println(runIdx);
        return profileService.getRunningEntity(runIdx);


    }

    @GetMapping("exercise/MonthlyExerciseData")
    public List<Map<String, Object>> getMonthlyRunningDat(HttpServletRequest request){
        User user = userService.getUserByReqeust(request);
        if (user == null) ResponseEntity.badRequest().body("Error in token");

        List<Map<String, Object>> monthlyRunningData = profileService.getMonthlyExerciseData(user.getId());

        return monthlyRunningData;
    }

    @GetMapping("start/date")
    public Map<String, Object> getStartDate(HttpServletRequest request){
        User user = userService.getUserByReqeust(request);
        if (user == null) ResponseEntity.badRequest().body("Error in token");

        Map<String, Object> startDate = profileService.getStartDate(user.getId());

        return startDate;
    }

    @GetMapping("{exerciseType}/records")
    public ResponseEntity<?> getRuningRecordss(
            HttpServletRequest request ,
            @PathVariable("exerciseType") String exerciseType,
            @RequestParam(value = "period", required = false) String period,
            @RequestParam(value = "detail", required = false) String detail){


        User user = userService.getUserByReqeust(request);
        if (user == null) {
            return ResponseEntity.badRequest().body("Error in token");
        }

        Object records; // 모든 타입의 리스트를 참조할 수 있도록 Object 타입 사용

        switch (exerciseType) {
            case "running":
                records = profileService.getRunningRecords(user.getId(), period, detail);
                 break;
            case "squat":
                records = profileService.getExerciseRecords(user.getId(), period, detail ,exerciseType);
                break;
            case "pushup":
                records = profileService.getExerciseRecords(user.getId(), period, detail ,exerciseType);
                break;
            case "situp":
                records = profileService.getExerciseRecords(user.getId(), period, detail ,exerciseType);
                break;
            default:
                return ResponseEntity.badRequest().body("Unknown exercise type: " + exerciseType);
        }
        // 비즈니스 로직 수행, 예: 사용자 ID와 쿼리 파라미터를 기반으로 데이터 조회

        // 조회된 데이터 반환
        return ResponseEntity.ok(records);
    }

}
