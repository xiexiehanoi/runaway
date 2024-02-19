package com.runaway.project.running.controller;


import com.runaway.project.running.dto.RunningDto;
import com.runaway.project.running.service.RunningService;
import com.runaway.project.user.entity.User;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/running")
public class RunningController {
    private final RunningService runningService;

    @PostMapping("/save")
    public void saveRunningRecord(@RequestBody RunningDto runningDto){
        System.out.println(runningDto.toString());
        User userEntity =runningService.findById(runningDto.getUserIdx());
        runningService.saveRunningRecord(runningDto,userEntity);

    }

}
