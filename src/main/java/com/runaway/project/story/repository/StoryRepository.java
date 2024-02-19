package com.runaway.project.story.repository;

import com.runaway.project.story.entity.StoryEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface StoryRepository extends JpaRepository<StoryEntity, Long> {

//    @Query("update story set storyWatchCount=storyWatchCount+1 where storyNum=#{storyNum}")
//    public void updateStoryWatchCount(Long storyNum);
}
