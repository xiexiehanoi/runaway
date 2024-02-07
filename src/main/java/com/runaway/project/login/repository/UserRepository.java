package com.runaway.project.login.repository;

import com.runaway.project.login.dto.User;
import com.runaway.project.login.dto.UserDto;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {

    User findByEmail(String email);
}
