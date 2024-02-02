package com.runaway.project.repository.challenge;

import com.runaway.project.dto.challenge.RunningDto;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RunningRepository extends JpaRepository<RunningDto,Long> {
}
