package com.runaway.project.story.controller;

import com.runaway.project.naver.storage.NcpObjectStorageService;
import com.runaway.project.story.dto.StoryDto;
import com.runaway.project.story.service.StoryService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/story")
public class StoryController {
    private final StoryService storyService;
    private final NcpObjectStorageService storageService;

    String storyContent;

    private String bucketName="runaway";

    private String folderName="runaway_story";

    @PostMapping("/upload")
    public String uploadStory(@RequestParam("upload") MultipartFile upload)
    {
        System.out.println("upload:"+upload.getOriginalFilename());
        storyContent=storageService.uploadFile(bucketName, folderName, upload);
        return storyContent;
    }

    @PostMapping("/insert")
    public void insertStory(@RequestBody StoryDto dto)
    {
        //업로드한 storyContent dto 에 넣기
        dto.setStoryContent(storyContent);

        //db insert
        storyService.addStory(dto);

        //storyContent 초기화
        storyContent=null;
    }
}
