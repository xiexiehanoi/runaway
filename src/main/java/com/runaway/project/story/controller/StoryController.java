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

//    String storyContent;

    @PostMapping("/save")
    public ResponseEntity<String> saveStory(
            @RequestParam("upload") MultipartFile upload,
            HttpServletRequest request
    ) {
        // 토큰에서 유저 정보 획득
        User user = userService.getUserByReqeust(request);

        if (user == null) return ResponseEntity.badRequest().body("Error in token");

        // 파일 업로드
        String fileName = storageService.uploadFileWithUserId(
                NcpObjectStorageService.STORY_DIR_NAME,
                upload,
                user.getId().toString()
        );

        // Dto를 어떻게 구성할지에 따라 새로 만들거나 파라미터로 받아오거나
        StoryDto storyDto = new StoryDto();
//        dto.setStoryContent(fileName);
        storyDto.setStoryContent(fileName);
        storyDto.setUserId(user.getId());
//        dto.setStoryUserId(user.getId());

        // 저장
        storyService.addStory(storyDto,user);

        // 반환
        return ResponseEntity.ok(fileName);

        //storyContent 초기화
//        storyContent=null;

    }
}
