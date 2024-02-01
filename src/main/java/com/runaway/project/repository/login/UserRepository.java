package com.runaway.project.repository.login;

import com.runaway.project.dto.login.UserDto;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<UserDto, Long> {

    UserDto findByUsername(String username);
}
