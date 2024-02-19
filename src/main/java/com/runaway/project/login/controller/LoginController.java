package com.runaway.project.login.controller;

import com.runaway.project.login.JwtProperties;
import com.runaway.project.login.model.OauthToken;
import com.runaway.project.login.service.*;
import com.runaway.project.user.entity.User;
import com.runaway.project.user.enums.SocialType;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/login")
public class LoginController {
    private final Map<String, LoginService> providerLoginServiceMap = new HashMap<>();
    private LoginService loginService;

    public LoginController(KakaoLoginService kakaoLoginService, NaverLoginService naverLoginService, GoogleLoginService googleLoginService) {
        providerLoginServiceMap.put(SocialType.KAKAO.name().toLowerCase(), kakaoLoginService);
        providerLoginServiceMap.put(SocialType.NAVER.name().toLowerCase(), naverLoginService);
        providerLoginServiceMap.put(SocialType.GOOGLE.name().toLowerCase(), googleLoginService);
    }

    @GetMapping("/oauth2/token")
    public ResponseEntity getLogin(@RequestParam("code") String code,
                                    @RequestParam("provider") String provider) {
        loginService = providerLoginServiceMap.get(provider);

        OauthToken oAuthToken = loginService.getAccessToken(code);
        String jwtToken = loginService.saveUserAndGetToken(oAuthToken.getAccessToken());

        HttpHeaders headers = new HttpHeaders();
        headers.add(JwtProperties.HEADER_STRING, JwtProperties.TOKEN_PREFIX + jwtToken);

        return ResponseEntity.ok().headers(headers).body("success");
    }

    @GetMapping("/me")
    public ResponseEntity<Object> getCurrentUser(HttpServletRequest request) {
        String provider = (String)request.getAttribute("provider");
        loginService = providerLoginServiceMap.get(provider);

        User user = loginService.getMyInfo(request);

        return ResponseEntity.ok().body(user);
    }

}
