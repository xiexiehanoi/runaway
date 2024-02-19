package com.runaway.project.story.dto;

import lombok.*;

import java.sql.Timestamp;

@Data
@NoArgsConstructor
@ToString
public class StoryDto {

    private Long storyNum;

    private Long UserId;

    private String storyContent;
    
    private int storyWatchCount;

    private Timestamp storyUploadTime;
}