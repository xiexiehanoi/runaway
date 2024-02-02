package com.runaway.project.login.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.runaway.project.login.enums.OAuthProvider;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.sql.Timestamp;

@Entity
@Getter
@Setter
@Table(name = "users")
public class UserDto {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(length = 100)
    private String username;

    @Column(length = 100)
    private String email;

    @Column(length = 50)
    private String nickname;

    @Column(length = 100)
    private String password;

    @Column(length = 3)
    private int age;

    @Column(length = 10)
    private String gender;

    @Column(length = 13)
    private String mobile;

    @Column(length = 100)
    private String profileImg;

//    @ManyToOne // Member와 Rank 간의 다대일(N:1) 연관 관계 설정
//    @JoinColumn(name = "rank_name", referencedColumnName = "rankName") // rank_name 컬럼을 사용하여 연결
//    private Rank rank;

    @Column
    private int point;

    @Column
    private int weight;

    @Column
    private int height;

    @Enumerated(EnumType.STRING)
    @Column(length = 20)
    private OAuthProvider provider;

    @Column
    @JsonFormat(pattern = "yyyy-MM-dd", timezone = "Asia/Seoul")
    private Timestamp createAt;

    @Column(length = 20)
    private String role;
}
