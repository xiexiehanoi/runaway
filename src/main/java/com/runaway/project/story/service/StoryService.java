package com.runaway.project.story.service;

import com.runaway.project.exercise.dto.ExerciseDto;
import com.runaway.project.exercise.entity.ExerciseEntity;
import com.runaway.project.story.dto.StoryDto;
import com.runaway.project.story.entity.StoryEntity;
import com.runaway.project.story.repository.StoryRepository;
import com.runaway.project.user.entity.User;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Optional;

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
}
