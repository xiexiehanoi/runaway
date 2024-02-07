package com.runaway.project.user.repository;

import com.runaway.project.user.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {

  Optional<User> findByEmail(String email);
  Optional<User> findByNickname(String nickname);
  Optional<User> findByUsername(String username);
}