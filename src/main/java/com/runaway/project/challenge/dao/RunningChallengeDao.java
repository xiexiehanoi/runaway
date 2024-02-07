package com.runaway.project.challenge.dao;

import com.runaway.project.challenge.dto.RunningChallengeDto;
import com.runaway.project.challenge.repository.RunningChallengeRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Repository;

import java.util.List;
@Repository
@AllArgsConstructor
public class RunningChallengeDao {
    private RunningChallengeRepository runningChallengeRepository;

    public List<RunningChallengeDto> getAllrunning(){
        return runningChallengeRepository.findAll();
    }
}
