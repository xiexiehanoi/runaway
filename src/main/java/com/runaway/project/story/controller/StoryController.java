package com.runaway.project.story.controller;

import com.runaway.project.naver.storage.NcpObjectStorageService;
import com.runaway.project.story.service.StoryService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
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

    @PostMapping("/add")
    public String uploadStory(@RequestParam("upload") MultipartFile upload)
    {
        System.out.println("upload:"+upload.getOriginalFilename());
        storyContent=storageService.uploadFile(bucketName, folderName, upload);
        return storyContent;
    }
}
