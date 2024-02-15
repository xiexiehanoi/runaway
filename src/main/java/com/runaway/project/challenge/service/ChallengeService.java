package com.runaway.project.challenge.service;

import com.runaway.project.challenge.dto.MyExerciseDto;
import com.runaway.project.challenge.dto.MyRunningDto;
import com.runaway.project.challenge.repository.MyExerciseRepository;
import com.runaway.project.challenge.repository.MyRunningRepository;
import com.runaway.project.user.entity.User;
import com.runaway.project.user.repository.UserRepository;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class ChallengeService {

    @Autowired
    private MyExerciseRepository myExerciseRepository;

    @Autowired
    private MyRunningRepository myRunningRepository;

    private final UserRepository userRepository;

    public User findById(Long userId) {
        Optional<User> OptionalUserEntity = userRepository.findById(userId);
        if (OptionalUserEntity.isPresent()) {
            return OptionalUserEntity.get();
        } else {
            throw new EntityNotFoundException("User not found for id: " + userId);
        }
    }

    public void insertExerciseChallenge(MyExerciseDto myExerciseDto, User userEntity){
        User user = findById(userEntity.getId());
        myExerciseDto.setUser(user);
        myExerciseRepository.save(myExerciseDto);
    }

    public void insertRunningChallenge(MyRunningDto myRunningDto,User userEntity){
        User user=findById(userEntity.getId());
        myRunningDto.setUser(user);
        myRunningRepository.save(myRunningDto);
    }

}
