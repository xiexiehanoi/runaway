package com.runaway.project.challenge.repository;

import com.runaway.project.challenge.dto.RunningDto;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RunningRepository extends JpaRepository<RunningDto,Long> {
}
