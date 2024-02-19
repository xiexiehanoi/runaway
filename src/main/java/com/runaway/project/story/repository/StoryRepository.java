package com.runaway.project.story.repository;

import com.runaway.project.story.entity.StoryEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;

import java.sql.Timestamp;
import java.time.LocalDateTime;

public interface StoryRepository extends JpaRepository<StoryEntity, Long> {

//    @Transactional
//    @Modifying
//    @Query("update story set storyWatchCount=storyWatchCount+1 where storyNum=:storyNum")
//    public void updateStoryWatchCount(Long storyNum);

    @Transactional
    @Modifying
//    @Query("delete from story where story_upload_time <= CURRENT_TIMESTAMP - INTERVAL 5 minute;")
//    void deleteByStoryUploadTimeBeforeLessThanEqual();
//    @Query("delete from story where story_upload_time <= DATE_SUB(NOW(), INTERVAL '5' minute);")
    @Query("DELETE FROM StoryEntity s WHERE s.storyUploadTime <= :timeThreshold")
    void deleteByStoryUploadTimeBeforeLessThanEqual(@Param("timeThreshold") LocalDateTime timeThreshold);
}
