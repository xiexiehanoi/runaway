package com.runaway.project.profile.service;


import com.runaway.project.running.entity.RunningEntity;
import com.runaway.project.running.repository.RunningRepository;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class ProfileService  {

    private final RunningRepository runningRepository;

    public List<RunningEntity> findByUserId(Long userId) {
        return runningRepository.findByUserId(userId);


    }
}
