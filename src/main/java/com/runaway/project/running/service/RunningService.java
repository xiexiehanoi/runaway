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

    public void calcAndSetCalorie(int weightKg, RunningDto runningDto) {
        double distanceKm = runningDto.getDistance();
        String[] runningTimes = runningDto.getRunningTime().split(":");
        if (runningTimes.length < 2) {
            runningDto.setCalorie(0);
            return ;
        }

        int runningMin = Integer.parseInt(runningTimes[0]);
        int runningSec = Integer.parseInt(runningTimes[1]);

        double timeMinutes =  runningMin + (double) runningSec / 60;
        double speedKmH = distanceKm / timeMinutes;
        double metValue = estimateMET(speedKmH);
        double durationHours = timeMinutes / 60;

        runningDto.setCalorie((int)(metValue * weightKg * durationHours));
    }

    private double estimateMET(double speedKmH) {
        if (speedKmH < 8) return 8.3; // Slow jogging
        if (speedKmH < 9.7) return 9.8; // Moderate running
        if (speedKmH < 12) return 11; // Fast running
        if (speedKmH < 16) return 12.3; // Faster running
        return 14; // Very fast running
    }


}
