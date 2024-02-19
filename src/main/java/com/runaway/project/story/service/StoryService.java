package com.runaway.project.story.service;

import com.runaway.project.story.dto.StoryDto;
import com.runaway.project.story.entity.StoryEntity;
import com.runaway.project.story.repository.StoryRepository;
import com.runaway.project.user.entity.User;
import lombok.RequiredArgsConstructor;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import java.sql.Timestamp;
import java.time.LocalDateTime;


@EnableScheduling
@Service
@RequiredArgsConstructor
public class StoryService {
    private final StoryRepository storyRepository;

    public void addStory(StoryDto storyDto, User user){
        StoryEntity storyEntity=new StoryEntity();
        storyEntity.setUser(user);
        storyEntity.setStoryContent(storyDto.getStoryContent());
        storyEntity.setStoryWatchCount(storyDto.getStoryWatchCount());
        storyEntity.setStoryUploadTime(storyDto.getStoryUploadTime());

        storyRepository.save(storyEntity);
    }

    // 매 시간마다 실행되는 작업을 설정합니다.
    @Scheduled(cron = "0 0 * * * *") // 매 시간 0분에 실행됩니다.
    public void deleteOldStories() {// 현재 시간에서 10분 이전의 시간을 구합니다.

        LocalDateTime timeThreshold = LocalDateTime.now().minusHours(24);
        // 현재 시간에서 1일 이전의 시간 이전에 업로드된 스토리를 삭제합니다.
        storyRepository.deleteByStoryUploadTimeBeforeLessThanEqual(timeThreshold);
    }
}
