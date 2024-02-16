package com.runaway.project.profile.controller;

import com.runaway.project.profile.service.ProfileService;
import com.runaway.project.running.entity.RunningEntity;
import lombok.RequiredArgsConstructor;
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


    @GetMapping("running/record")
    public List<RunningEntity> getRunningRecord(@RequestParam Long userId){
        System.out.println(userId);
        System.out.println(profileService.findByUserId(userId).toString());
        return profileService.findByUserId(userId);

    }

    @GetMapping("running/detail")
    public RunningEntity getRunningRecordDetail(@RequestParam Long runIdx){
        System.out.println(runIdx);
        return profileService.getRunningEntity(runIdx);


    }


}
