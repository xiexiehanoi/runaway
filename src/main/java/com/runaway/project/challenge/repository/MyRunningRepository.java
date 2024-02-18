package com.runaway.project.challenge.repository;


import com.runaway.project.challenge.dto.MyRunningDto;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.time.LocalDate;
import java.util.List;

public interface MyRunningRepository extends JpaRepository<MyRunningDto,Long> {

    List<MyRunningDto> findAllByUserIdAndStartDate(Long userId,LocalDate starDate);

}
