package com.runaway.project.story.service;

import com.runaway.project.story.dto.StoryDto;
import com.runaway.project.story.repository.StoryRepository;
import com.runaway.project.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class StoryService {
    private final StoryRepository storyRepository;
    private final UserRepository userRepository;

    public void addStory(StoryDto dto){
        storyRepository.save(dto);
    }
}
