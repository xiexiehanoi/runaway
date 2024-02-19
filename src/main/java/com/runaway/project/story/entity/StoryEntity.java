package com.runaway.project.story.entity;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.runaway.project.user.entity.User;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;

import java.sql.Timestamp;

@Entity
@Data
@NoArgsConstructor
@Table(name = "story")
public class StoryEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long storyNum;

    // User 외래키로 변경 필요
//    @Column(length=30)
//    private Long storyUserId;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

//    @Column(length=100)
//    private String storyProfileImg;

    @Column(length=100)
    private String storyContent;

    private int storyWatchCount;

    @JsonFormat(pattern="yyyy-MM-dd HH:mm",timezone="Asia/Seoul") //댓글은 출력을 ajax 로 처리할 것임
    @Column(updatable=false) //수정 시 수정 컬럼에서 제외
    @CreationTimestamp //엔터티가 생성되는 시점의 시간이 자동 등록
    private Timestamp storyUploadTime;
}
