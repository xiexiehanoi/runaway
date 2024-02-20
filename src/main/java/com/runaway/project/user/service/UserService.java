package com.runaway.project.user.service;

import com.runaway.project.user.dto.SignUpRequestDto;
import com.runaway.project.user.dto.UserInfo;
import com.runaway.project.user.entity.User;
import com.runaway.project.user.repository.UserRepository;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.NoSuchElementException;
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

  public UserInfo getUserInfo(String email) {
    User user = userRepository.findByEmail(email).orElseThrow(() -> new NoSuchElementException("회원이 없습니다."));
    Integer height = user.getHeight();
    Integer weight = user.getWeight();

    if (height != null || height != 0) {

    }

    if (weight != null || weight != 0) {

    }

    // gender 값에 따라 "남자" 또는 "여자"로 빌드
    String gender = user.getGender();
    if ("male".equalsIgnoreCase(gender) || "M".equalsIgnoreCase(gender)) {
      gender = "남자";
    } else if ("female".equalsIgnoreCase(gender) || "F".equalsIgnoreCase(gender)) {
      gender = "여자";
    } else {
      gender = "짐승";
    }


    return UserInfo.builder()
        .email(user.getEmail())
        .birthdate(user.getBirthdate())
        .gender(gender)
        .nickname(user.getNickname())
        .build();
  }

  // 유저 중복 확인
  private void validateDuplicateUser(String email) {
    Optional<User> findUsers = userRepository.findByEmail(email);
    if(!findUsers.isEmpty()) {
      throw new RuntimeException("이미 가입된 이메일 입니다.");
    }
  }
}