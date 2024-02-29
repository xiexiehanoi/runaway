package com.runaway.project.user.dto;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class UserInfo {
  private String username;
  private String email;
  private String birthdate;
  private String gender;
  private String nickname;
}
