package com.runaway.project.repository;

import com.runaway.project.dto.WebCamDto;
import org.springframework.data.jpa.repository.JpaRepository;

public interface WebCamDaoInter extends JpaRepository<WebCamDto, Long> {

}
