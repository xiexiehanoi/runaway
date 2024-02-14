package com.runaway.project.running.repository;

import com.runaway.project.running.entity.RunningEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;


public interface RunningRepository  extends JpaRepository<RunningEntity ,Long> {

    List<RunningEntity> findByUserId(Long userId);
}
