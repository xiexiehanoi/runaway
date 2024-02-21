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


}
