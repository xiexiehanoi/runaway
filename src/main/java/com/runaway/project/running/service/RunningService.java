package com.runaway.project.running.service;


import com.runaway.project.running.dto.RunningDto;
import com.runaway.project.running.entity.RunningEntity;
import com.runaway.project.running.repository.RunningRepository;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class RunningService {
    private final RunningRepository runningRepository;
    private final ModelMapper modelMapper;

    public void saveRunningRecord(RunningDto runningDto) {

        RunningEntity runningEntity=modelMapper.map(runningDto, RunningEntity.class);
        runningRepository.save(runningEntity);

    }
}
