package com.runaway.project.user.dto;

import com.runaway.project.user.entity.User;
import com.runaway.project.user.enums.Role;
import com.runaway.project.user.enums.SocialType;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import static com.runaway.project.user.enums.SocialType.LOCAL;
import static com.runaway.project.user.enums.Role.USER;

@Getter
@NoArgsConstructor
public class SignUpRequestDto {
  private String username;
  private String email;
  private String password;
  private String nickname;
  private String birthdate;
  private String gender;
  private String phone;
  private int weight;
  private int height;

  @Builder
  public SignUpRequestDto(String username, String email, String password, String nickname, String birthdate, String gender, String phone, int weight, int height, SocialType socialType, Role role) {
    this.username = username;
    this.email = email;
    this.password = password;
    this.nickname = nickname;
    this.birthdate = birthdate;
    this.gender = gender;
    this.phone = phone;
    this.weight = weight;
    this.height = height;
  }

  public User toEntity(final String encryptedPassword) {
    return User.builder()
        .username(this.getUsername())
        .email(this.getEmail())
        .password(encryptedPassword)
        .nickname(this.nickname)
        .birthdate(this.birthdate)
        .gender(this.gender)
        .phone(this.phone)
        .weight(this.weight)
        .height(this.height)
        .socialType(LOCAL)
        .role(USER)
        .build();
  }
}