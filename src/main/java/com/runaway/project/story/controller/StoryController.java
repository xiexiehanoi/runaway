package com.runaway.project.story.controller;

import com.runaway.project.naver.storage.NcpObjectStorageService;
import com.runaway.project.story.dto.StoryDto;
import com.runaway.project.story.service.StoryService;
import com.runaway.project.user.entity.User;
import com.runaway.project.user.service.UserService;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/story")
public class StoryController {
    private final StoryService storyService;
    private final NcpObjectStorageService storageService;
    private final UserService userService;

    String storyContent;

    private String bucketName="runaway";

    private String folderName="runaway_story";

    @PostMapping("/save")
    public ResponseEntity<String> saveStory(
            @RequestParam("upload") MultipartFile upload,
            HttpServletRequest request
    ) {
        // 토큰에서 유저 정보 획득
        User user = userService.getUserByReqeust(request);

        // 파일 업로드
        String fileName = storageService.uploadFile(bucketName, folderName, upload);

        // Dto를 어떻게 구성할지에 따라 새로 만들거나 파라미터로 받아오거나
        StoryDto dto = new StoryDto();
        dto.setStoryContent(fileName);
        dto.setStoryUserId(user.getId());

        // 저장
        storyService.addStory(dto);

        // 반환
        return ResponseEntity.ok(fileName);
    }

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
