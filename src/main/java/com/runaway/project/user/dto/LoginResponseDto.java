package com.runaway.project.user.dto;

import com.runaway.project.user.enums.Role;
import com.runaway.project.user.enums.SocialType;
import lombok.Builder;
import lombok.Value;

@Value
@Builder
public class LoginResponseDto {
  String accessToken;
}
