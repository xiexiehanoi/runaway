package com.runaway.project.profile.controller;

import com.runaway.project.profile.service.ProfileService;
import com.runaway.project.running.entity.RunningEntity;
import com.runaway.project.user.entity.User;
import com.runaway.project.user.service.UserService;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

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

    @GetMapping("running/MonthlyRunningData")
    public List<Map<String, Object>> getMonthlyRunningDat(HttpServletRequest request){
        User user = userService.getUserByReqeust(request);
        if (user == null) ResponseEntity.badRequest().body("Error in token");

        List<Map<String, Object>> monthlyRunningData = profileService.getMonthlyRunningData(user.getId());

        return monthlyRunningData;
    }

    @GetMapping("start/date")
    public Map<String, Object> getStartDate(HttpServletRequest request){
        User user = userService.getUserByReqeust(request);
        if (user == null) ResponseEntity.badRequest().body("Error in token");

        Map<String, Object> startDate = profileService.getStartDate(user.getId());

        return startDate;
    }

    @GetMapping("running/recordss")
    public ResponseEntity<?> getRuningRecordss(
            HttpServletRequest request,
            @RequestParam(value = "period", required = false) String period,
            @RequestParam(value = "detail", required = false) String detail){

        User user = userService.getUserByReqeust(request);
        if (user == null) {
            return ResponseEntity.badRequest().body("Error in token");
        }

        // 비즈니스 로직 수행, 예: 사용자 ID와 쿼리 파라미터를 기반으로 데이터 조회
        List<RunningEntity> records = profileService.getRunningRecords(user.getId(), period, detail);

        // 조회된 데이터 반환
        return ResponseEntity.ok(records);
    }



}
