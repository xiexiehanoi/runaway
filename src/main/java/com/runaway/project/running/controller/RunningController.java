package com.runaway.project.running.controller;

import com.runaway.project.running.dto.RunningDto;
import com.runaway.project.running.entity.RunningEntity;
import com.runaway.project.running.service.RunningService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
public class RunningController {
    private final RunningService runningService;

    @PostMapping("/running/save")
    public void saveRunningRecord(@RequestBody RunningDto runningDto){
        runningService.saveRunningRecord(runningDto);

    }

}