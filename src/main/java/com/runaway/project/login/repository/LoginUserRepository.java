package com.runaway.project.login.repository;

import com.runaway.project.login.dto.User;
import com.runaway.project.login.dto.UserDto;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

public interface LoginUserRepository extends JpaRepository<UserDto, Long> {

}
