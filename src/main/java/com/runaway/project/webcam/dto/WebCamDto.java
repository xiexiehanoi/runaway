package com.runaway.project.webcam.dto;

import com.fasterxml.jackson.annotation.JsonFormat;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;

import java.sql.Timestamp;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "webcam")
public class WebCamDto {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long webCamNum;

    @Column(length=30)
    private String webCamUserId;

    @Column(length=100)
    private String webCamProfileImg;

    @Column(length=100)
    private String webCamContent;
    
    private Long webCamWatchCount;

    @JsonFormat(pattern="yyyy-MM-dd HH:mm",timezone="Asia/Seoul") //댓글은 출력을 ajax 로 처리할 것임
    @Column(updatable=false) //수정 시 수정 컬럼에서 제외
    @CreationTimestamp //엔터티가 생성되는 시점의 시간이 자동 등록
    private Timestamp webCamUploadTime;
}
