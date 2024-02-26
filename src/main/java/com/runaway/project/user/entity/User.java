package com.runaway.project.user.entity;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.runaway.project.user.enums.Role;
import com.runaway.project.user.enums.SocialType;
import com.runaway.project.user.repository.GradeRepository;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.ColumnDefault;
import org.hibernate.annotations.CreationTimestamp;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Configurable;

import java.sql.Timestamp;
import java.util.Objects;
import java.util.Optional;


@Entity
@Data
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Table(name = "users")
@Configurable
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

  @ManyToOne
  @JoinColumn(name = "grade_id")
  private Grade grade;

  @Transient
  private String gradeName;

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

  @Autowired
  @Transient
  private GradeRepository gradeRepository;

  @Builder
  public User(Long id, String username, String email, String password, String nickname, String birthdate, String gender, String imageUrl,
              int point, int weight, int height, Grade grade, SocialType socialType, Role role, Timestamp createAt) {
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
    this.grade = grade;
    this.socialType = socialType;
    this.role = role;
    this.createAt = createAt;
    if (grade != null) {
      this.gradeName = grade.getLevel();
    }
  }

  public void addPoints(int pointsToAdd, GradeRepository gradeRepository) {
    this.point += pointsToAdd;
    Grade currentGrade = this.grade;
    Optional<Grade> optionalNewGrade = gradeRepository.findByMinPointLessThanEqualAndMaxPointGreaterThanEqual(this.point, this.point);
    Grade newGrade = optionalNewGrade.orElse(null);
//    System.out.println("newGrade: "+newGrade);
    if (!Objects.equals(currentGrade, newGrade)) {
      this.grade = newGrade;
    }
  }

  public void addInfo(User user) {
    this.username = user.username;
    this.nickname = user.nickname;
    this.birthdate = user.birthdate;
    this.gender = user.gender;
    this.weight = user.weight;
    this.height = user.height;
    this.role = Role.USER;
  }


}