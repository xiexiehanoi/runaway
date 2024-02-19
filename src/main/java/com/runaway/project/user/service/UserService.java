package com.runaway.project.user.service;

import com.runaway.project.user.dto.SignUpRequestDto;
import com.runaway.project.user.entity.User;
import com.runaway.project.user.repository.UserRepository;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class UserService {
  private final UserRepository userRepository;
  private final PasswordEncoder passwordEncoder;

  public User getUserById(Long id) {
    return userRepository.findById(id).orElse(null);
  }

  public User getUserByReqeust(HttpServletRequest request) {
    Long id = (Long)request.getAttribute("id");
    return userRepository.findById(id).orElse(null);
  }

  @Transactional
  public void signUpUser(SignUpRequestDto signUpRequestDto) {
    validateDuplicateUser(signUpRequestDto.getEmail());

    String encryptedPassword = passwordEncoder.encode(signUpRequestDto.getPassword());
    User user = signUpRequestDto.toEntity(encryptedPassword);

    userRepository.save(user);
  }

  // 유저 중복 확인
  private void validateDuplicateUser(String email) {
    Optional<User> findUsers = userRepository.findByEmail(email);
    if(!findUsers.isEmpty()) {
      throw new RuntimeException("이미 가입된 이메일 입니다.");
    }
  }
}