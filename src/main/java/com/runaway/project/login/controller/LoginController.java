package com.runaway.project.login.controller;

import com.runaway.project.login.JwtProperties;
import com.runaway.project.login.model.OauthToken;
import com.runaway.project.login.service.KakaoLoginService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.security.oauth2.core.OAuth2Token;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/login")
public class LoginController {
    @Autowired
    private KakaoLoginService kakaoLoginService;

    @GetMapping("/oauth2/token")
    public ResponseEntity getLogin(@RequestParam("code") String code) {
        OauthToken oAuthToken = kakaoLoginService.getAccessToken(code);
        String jwtToken = kakaoLoginService.saveUserAndGetToken(oAuthToken.getAccessToken());
        HttpHeaders headers = new HttpHeaders();
        headers.add(JwtProperties.HEADER_STRING, JwtProperties.TOKEN_PREFIX + jwtToken);

        return ResponseEntity.ok().headers(headers).body("success");
    }
}
