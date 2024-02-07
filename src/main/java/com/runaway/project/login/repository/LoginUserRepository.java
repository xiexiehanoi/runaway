package com.runaway.project.login.repository;

import com.runaway.project.login.dto.UserDto;
import org.springframework.data.jpa.repository.JpaRepository;

public interface LoginUserRepository extends JpaRepository<UserDto, Long> {

    UserDto findByUsername(String username);
}
