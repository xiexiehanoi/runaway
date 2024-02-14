package com.runaway.project.story.repository;

import com.runaway.project.story.dto.StoryDto;
import org.springframework.data.jpa.repository.JpaRepository;

public interface StoryRepository extends JpaRepository<StoryDto, Long> {
}
