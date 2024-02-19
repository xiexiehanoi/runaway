package com.runaway.project.challenge.repository;

import com.runaway.project.challenge.dto.RunningChallengeDto;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RunningChallengeRepository extends JpaRepository<RunningChallengeDto,Long> {

//    public void findById(int runningChallengeId);
}
