package com.runaway.project.challenge.repository;


import com.runaway.project.challenge.dto.MyRunningDto;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface MyRunningRepository extends JpaRepository<MyRunningDto,Long> {

    @Query("select mr from MyRunningDto mr where mr.user.id=:userId and mr.idx=:idx")
    public String findByUserIdWithChallengeId(Long userId, int idx);
}
