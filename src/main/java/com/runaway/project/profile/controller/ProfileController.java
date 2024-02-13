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


    @GetMapping("map/path")
    public List<RunningEntity> getMapPath(@RequestParam Long userId){
        return profileService.findByUserId(userId);

//        for (RunningEntity runningEntity : runningEntityList) {
//            List<LocationEntity> path = runningEntity.getPath();
//            for (LocationEntity location : path) {
//                double latitude = location.getLatitude();
//                double longitude = location.getLongitude();
//
//        }










    }


}
