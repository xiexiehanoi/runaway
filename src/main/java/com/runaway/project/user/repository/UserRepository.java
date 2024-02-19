package com.runaway.project.user.repository;

import com.runaway.project.ranking.dto.RankingDto;
import com.runaway.project.user.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {

  Optional<User> findByEmail(String email);
  Optional<User> findByNickname(String nickname);
  Optional<User> findByUsername(String username);

  Optional<User> findById(Long id);

  @Query("SELECT new com.runaway.project.ranking.dto.RankingDto(u.id, u.nickname, u.point) FROM User u ORDER BY u.point DESC")
  List<RankingDto> findAllByOrderByPointDesc();
}