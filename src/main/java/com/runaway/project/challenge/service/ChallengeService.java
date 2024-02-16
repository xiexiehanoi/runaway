package com.runaway.project.challenge.service;

import com.runaway.project.challenge.dto.MyExerciseDto;
import com.runaway.project.challenge.dto.MyRunningDto;
import com.runaway.project.challenge.repository.MyExerciseRepository;
import com.runaway.project.challenge.repository.MyRunningRepository;
import com.runaway.project.running.entity.RunningEntity;
import com.runaway.project.running.repository.RunningRepository;
import com.runaway.project.user.entity.User;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class ChallengeService {

    @Autowired
    private MyExerciseRepository myExerciseRepository;

    @Autowired
    private MyRunningRepository myRunningRepository;
    private final RunningRepository runningRepository;

    public void insertExerciseChallenge(MyExerciseDto myExerciseDto){
        myExerciseRepository.save(myExerciseDto);
    }

    public void insertRunningChallenge(MyRunningDto myRunningDto){

        myRunningRepository.save(myRunningDto);
    }

    public List<RunningEntity> getRunningRecord(MyRunningDto myRunningDto, User userId){

        List<RunningEntity> runningRecords = runningRepository.findAllByUserIdAndDate(
                myRunningDto.getUser().getId(),
                myRunningDto.getStart_date(),
                myRunningDto.getEnd_date());
    }

}
