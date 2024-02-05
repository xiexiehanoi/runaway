package com.runaway.project.challenge.dao;

import com.runaway.project.challenge.dto.RunningDto;
import com.runaway.project.challenge.repository.RunningRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Repository;

import java.util.List;
@Repository
@AllArgsConstructor
public class RunningDao {
    private RunningRepository runningRepository;

    public List<RunningDto> getAllrunning(){
        return runningRepository.findAll();
    }
}
