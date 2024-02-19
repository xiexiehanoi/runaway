package com.runaway.project.login.service;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.runaway.project.login.JwtProperties;
import com.runaway.project.user.dto.LoginRequestDto;
import com.runaway.project.user.dto.LoginResponseDto;
import com.runaway.project.user.entity.User;
import com.runaway.project.user.repository.UserRepository;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.Date;
import java.util.Locale;
import java.util.Optional;


@Service
public class LocalLoginService {
  @Autowired
  private UserRepository userRepository;

  @Autowired
  private PasswordEncoder passwordEncoder;


  @Transactional
  public ResponseEntity<String> signIn(LoginRequestDto loginRequestDto) {
    String email = loginRequestDto.getEmail();
    String inputPassword = loginRequestDto.getPassword();

    Optional<User> checkEmail = userRepository.findByEmail(email);
    User user = checkEmail.get();
    String storedPassword = user.getPassword();
    System.out.println(inputPassword + storedPassword);

    if (checkEmail.isEmpty()) {
      throw new RuntimeException("로그인 정보가 틀립니다.");
    }

    if (!passwordEncoder.matches(inputPassword, storedPassword)) {
      throw new RuntimeException("로그인 정보가 틀립니다.");
    }

    LoginResponseDto loginResponseDto = LoginResponseDto.builder()
        .accessToken(JwtProperties.TOKEN_PREFIX + createToken(user))
        .build();

    HttpHeaders headers = new HttpHeaders();
    headers.add(JwtProperties.HEADER_STRING, loginResponseDto.getAccessToken());


    return ResponseEntity.ok().headers(headers).body("success");
  }

  private String createToken(User user) {
    String jwtToken = JWT.create()
        .withSubject(user.getEmail())
        .withExpiresAt(new Date(System.currentTimeMillis() + JwtProperties.EXPIRATION_TIME))
        .withClaim("id", user.getId())
        .withClaim("nickname", user.getNickname())
        .withClaim("provider", user.getSocialType().name().toLowerCase(Locale.ROOT))
        .sign(Algorithm.HMAC512(JwtProperties.SECRET));

    return jwtToken;
  }
}
