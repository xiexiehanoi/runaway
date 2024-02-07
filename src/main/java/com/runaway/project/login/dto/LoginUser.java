package com.runaway.project.login.dto;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;

import java.sql.Timestamp;

@Entity
@Data
@NoArgsConstructor
public class LoginUser {
    @Id
    private Long userIdx;
    private String email;
    private String passwd;
    @CreationTimestamp
    private Timestamp createdTime;

}
