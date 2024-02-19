package com.runaway.project.user.dto;

import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class LoginRequestDto {

  @NotNull(message = "이메일을 입력하세요.")
  private String email;

  @NotNull(message = "비밀번호를 입력하세요.")
  private String password;

}
