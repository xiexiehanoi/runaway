package com.runaway.project.user.controller;

import com.runaway.project.login.service.LocalLoginService;
import com.runaway.project.user.dto.LoginRequestDto;
import com.runaway.project.user.dto.LoginResponseDto;
import com.runaway.project.user.dto.SignUpRequestDto;
import com.runaway.project.user.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.cglib.core.Local;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import jakarta.validation.Valid;
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/user")
public class UserController {

  private final UserService userService;
  private final LocalLoginService localLoginService;

  /**
   * 회원가입
   */
  @PostMapping("/sign-up")
  @ResponseStatus(HttpStatus.CREATED)
  public void signUp(final @Valid @RequestBody SignUpRequestDto signUpRequestDto) {
    userService.signUpUser(signUpRequestDto);
  }

  /**
   *  로컬 로그인
   */
  @PostMapping("/sign-in")
  public ResponseEntity<String> signIn(final @Valid @RequestBody LoginRequestDto loginRequestDto) {
    return localLoginService.signIn(loginRequestDto);
  }
}

