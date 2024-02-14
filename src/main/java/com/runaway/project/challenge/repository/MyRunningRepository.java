package com.runaway.project.challenge.repository;


import com.runaway.project.challenge.dto.MyRunningDto;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MyRunningRepository extends JpaRepository<MyRunningDto,Long> {
}
