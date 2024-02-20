package com.runaway.project.running.service;


import com.runaway.project.challenge.dto.MyRunningDto;
import com.runaway.project.challenge.repository.MyRunningRepository;
import com.runaway.project.running.dto.RunningDto;
import com.runaway.project.running.entity.RunningEntity;
import com.runaway.project.running.repository.RunningRepository;
import com.runaway.project.user.entity.User;
import com.runaway.project.user.repository.UserRepository;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class RunningService {
    private final RunningRepository runningRepository;
    private final UserRepository userRepository;
    private final ModelMapper modelMapper;
    private final MyRunningRepository myRunningRepository;

    public User findById(Long userIdx) {
        Optional<User> OptionalUserEntity=userRepository.findById(userIdx);
        if(OptionalUserEntity.isPresent()){
            return OptionalUserEntity.get();
        }else {
            throw new EntityNotFoundException("User not found for id: " + userIdx);
        }
    }

    public void saveRunningRecord(RunningDto runningDto, User userEntity) {

        RunningEntity runningEntity=modelMapper.map(runningDto, RunningEntity.class);
        runningEntity.setUser(userEntity);
        runningRepository.save(runningEntity);
    }

    public List<MyRunningDto> findCurrentChallengesByUserId(Long userId, LocalDate today) {
        return myRunningRepository.findAllByUserIdAndDateRange(userId, today);
    }

}
