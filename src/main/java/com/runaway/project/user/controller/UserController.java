package com.runaway.project.user.controller;

import com.runaway.project.user.dto.SignUpRequestDto;
import com.runaway.project.user.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import jakarta.validation.Valid;
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/user")
public class UserController {

  private final UserService userService;

  /**
   * 회원가입
   */
  @PostMapping("/sign-up")
  @ResponseStatus(HttpStatus.CREATED)
  public void signUp(final @Valid @RequestBody SignUpRequestDto signUpRequestDto) {
    userService.signUpUser(signUpRequestDto);
  }
}