package com.runaway.project.user.controller;

import com.runaway.project.login.service.LocalLoginService;
import com.runaway.project.naver.storage.ProfileImageStorageService;
import com.runaway.project.user.dto.LoginRequestDto;
import com.runaway.project.user.dto.SignUpRequestDto;
import com.runaway.project.user.entity.User;
import com.runaway.project.user.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import jakarta.validation.Valid;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/user")
public class UserController {

  private final UserService userService;
  private final LocalLoginService localLoginService;

  private final ProfileImageStorageService storageService;

  // 업로드한 파일명
  private String uploadFilename;

  /**
   * 회원가입
   */
  @PostMapping("/sign-up")
  @ResponseStatus(HttpStatus.CREATED)
  public void signUp(final @Valid @RequestBody SignUpRequestDto signUpRequestDto) {
    userService.signUpUser(signUpRequestDto);
  }

  @PatchMapping("/sign-up/add/{id}")
  public void signUpAdd(@PathVariable Long id, final @Valid @RequestBody User user) {
    userService.signUpAdd(id, user);
  }

  /**
   *  로컬 로그인
   */
  @PostMapping("/sign-in")
  public ResponseEntity<String> signIn(final @Valid @RequestBody LoginRequestDto loginRequestDto) {
    return localLoginService.signIn(loginRequestDto);
  }

//   가입 시 사진 저장
  @PostMapping("/mypage/photo-upload/{id}")
  public void uploadProfileImage(@PathVariable Long id, @RequestParam("upload") MultipartFile upload) {
    String folderName = ProfileImageStorageService.PROFILE_DIR_NAME;
    uploadFilename = storageService.uploadFile(folderName, upload);
    // 사용자의 현재 프로필 사진 파일 이름을 조회
    String currentFileName = userService.getUserById(id).getImageUrl();

    // 현재 프로필 사진이 있다면 삭제
    if (currentFileName != null) {
      storageService.deleteFile(folderName, currentFileName);
    }

    userService.profileImageAdd(id, uploadFilename);
  }
}

