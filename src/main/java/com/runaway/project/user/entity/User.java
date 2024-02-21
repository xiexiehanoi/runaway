package com.runaway.project.user.entity;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.runaway.project.user.enums.Role;
import com.runaway.project.user.enums.SocialType;
import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.ColumnDefault;
import org.hibernate.annotations.CreationTimestamp;

import java.sql.Timestamp;

@Entity
@Getter
@NoArgsConstructor
@Table(name = "users")
public class User {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @Column(length = 20, nullable = true)
  private String username;

  @Column(length = 100, nullable = true, unique = true)
  private String email;

  @Column(nullable = true)
  private String password;

  @Column(length = 50,  nullable = true, unique = true)
  private String nickname;

  @Column(length = 13, nullable = true)
  private String birthdate;

  @Column(length = 10, nullable = true)
  private String gender;

  @Column(length = 100)
  @ColumnDefault("'no'") // default
  private String imageUrl;

  @Column
  @ColumnDefault("0") // default
  private int point;

  @Column
  private int weight;

  @Column
  private int height;

  @Enumerated(EnumType.STRING)
  @Column(length = 20)
  private SocialType socialType;

  @Column(nullable = true)
  @Enumerated(EnumType.STRING)
  private Role role;

  @CreationTimestamp
  @Column(updatable = true)
  @JsonFormat(pattern = "yyyy-MM-dd", timezone = "Asia/Seoul")
  private Timestamp createAt;

  @Builder
  public User(Long id, String username, String email, String password, String nickname, String birthdate, String gender, String imageUrl, int point, int weight, int height, SocialType socialType, Role role, Timestamp createAt) {
    this.id = id;
    this.username = username;
    this.email = email;
    this.password = password;
    this.nickname = nickname;
    this.birthdate = birthdate;
    this.gender = gender;
    this.imageUrl = imageUrl;
    this.point = point;
    this.weight = weight;
    this.height = height;
    this.socialType = socialType;
    this.role = role;
    this.createAt = createAt;
  }

}