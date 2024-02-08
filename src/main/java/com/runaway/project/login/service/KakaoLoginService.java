package com.runaway.project.login.service;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.runaway.project.login.JwtProperties;
import com.runaway.project.login.dto.LoginUser;
import com.runaway.project.login.model.KakaoLoginConfig;
import com.runaway.project.login.model.KakaoProfile;
import com.runaway.project.login.model.OauthToken;
import com.runaway.project.user.entity.User;
import com.runaway.project.user.repository.UserRepository;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestTemplate;

import java.util.Date;

@Service
@EnableConfigurationProperties(KakaoLoginConfig.class)
public class KakaoLoginService implements LoginService {
    @Autowired private KakaoLoginConfig kakaoLoginConfig;
    @Autowired private UserRepository userRepository;

    public OauthToken getAccessToken(String code) {
        RestTemplate rt = new RestTemplate();

        HttpHeaders headers = new HttpHeaders();
        headers.add("Content-type", "application/x-www-form-urlencoded;charset=utf-8");

        MultiValueMap<String, String> params = new LinkedMultiValueMap<>();
        params.add("grant_type", "authorization_code");
        params.add("client_id", kakaoLoginConfig.getClientId());
        params.add("redirect_uri", kakaoLoginConfig.getRedirectUri());
        params.add("code", code);
        params.add("client_secret", kakaoLoginConfig.getClientSecret());

        HttpEntity<MultiValueMap<String, String>> kakaoTokenRequest =
                new HttpEntity<>(params, headers);

        ResponseEntity<String> accessTokenResponse = rt.exchange(
                "https://kauth.kakao.com/oauth/token",
                HttpMethod.POST,
                kakaoTokenRequest,
                String.class
        );

        ObjectMapper objectMapper = new ObjectMapper();

        OauthToken oauthToken = null;
        try {
            oauthToken = objectMapper.readValue(accessTokenResponse.getBody(), OauthToken.class);
        } catch (JsonProcessingException e) {
            e.printStackTrace();
        }

        return oauthToken;
    }

    private KakaoProfile findProfile(String token) {
        RestTemplate rt = new RestTemplate();

        HttpHeaders headers = new HttpHeaders();
        headers.add("Authorization", "Bearer " + token);
        headers.add("Content-type", "application/x-www-form-urlencoded;charset=utf-8");

        HttpEntity<MultiValueMap<String, String>> kakaoProfileRequest =
                new HttpEntity<>(headers);
        ResponseEntity<String> kakaoProfileResponse = rt.exchange(
                "https://kapi.kakao.com/v2/user/me",
                HttpMethod.POST,
                kakaoProfileRequest,
                String.class
        );
        ObjectMapper objectMapper = new ObjectMapper();
        KakaoProfile kakaoProfile = null;
        try {
            kakaoProfile = objectMapper.readValue(kakaoProfileResponse.getBody(), KakaoProfile.class);
        } catch (JsonProcessingException e) {
            e.printStackTrace();
        }

        return kakaoProfile;
    }

    @Override
    public String saveUserAndGetToken(String token) {
        KakaoProfile profile = findProfile(token);

        User user = userRepository.findByEmail(profile.getKakao_account().getEmail()).orElse(null);

        if (user == null) {
            user = User.builder()
                    .id(profile.getId())
                    .nickname(profile.getKakao_account().getProfile().getNickname())
                    .birthdate(profile.getKakao_account().getBirthday())
                    .gender(profile.getKakao_account().getGender())
                    .build();

            userRepository.save(user);
        }

        return createToken(user);
    }

    @Override
    public String createToken(User user) {
        String jwtToken = JWT.create()
                .withSubject(user.getEmail())
                .withExpiresAt(new Date(System.currentTimeMillis() + JwtProperties.EXPIRATION_TIME))
                .withClaim("id", user.getId())
                .withClaim("nickname", user.getNickname())
                .sign(Algorithm.HMAC512(JwtProperties.SECRET));

        return jwtToken;
    }
}
