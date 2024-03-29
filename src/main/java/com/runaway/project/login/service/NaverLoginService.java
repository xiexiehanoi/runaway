package com.runaway.project.login.service;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.runaway.project.login.JwtProperties;
import com.runaway.project.login.model.*;
import com.runaway.project.user.entity.Grade;
import com.runaway.project.user.entity.User;
import com.runaway.project.user.enums.SocialType;
import com.runaway.project.user.repository.GradeRepository;
import com.runaway.project.user.repository.UserRepository;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestTemplate;

import java.util.Date;
import java.util.Locale;

@Service
@EnableConfigurationProperties(NaverLoginConfig.class)
public class NaverLoginService implements LoginService {
    @Autowired private NaverLoginConfig naverLoginConfig;
    @Autowired private UserRepository userRepository;
    @Autowired private GradeRepository gradeRepository;

    @Override
    public User getMyInfo(HttpServletRequest request) {
        Long userId = (Long)request.getAttribute("id");
        User user = userRepository.findById(userId).orElse(null);
        return user;
    }

    @Override
    public OauthToken getAccessToken(String code) {
        RestTemplate rt = new RestTemplate();

        HttpHeaders headers = new HttpHeaders();
        headers.add("Content-type", "application/x-www-form-urlencoded;charset=utf-8");

        MultiValueMap<String, String> params = new LinkedMultiValueMap<>();
        params.add("grant_type", "authorization_code");
        params.add("client_id", naverLoginConfig.getClientId());
        params.add("redirect_uri", naverLoginConfig.getRedirectUri());
        params.add("code", code);
        params.add("client_secret", naverLoginConfig.getClientSecret());

        HttpEntity<MultiValueMap<String, String>> naverTokenRequest =
                new HttpEntity<>(params, headers);

        ResponseEntity<String> accessTokenResponse = rt.exchange(
                "https://nid.naver.com/oauth2.0/token",
                HttpMethod.POST,
                naverTokenRequest,
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

    private NaverProfile findProfile(String token) {
        RestTemplate rt = new RestTemplate();

        HttpHeaders headers = new HttpHeaders();
        headers.add("Authorization", "Bearer " + token);
        headers.add("Content-type", "application/x-www-form-urlencoded;charset=utf-8");

        HttpEntity<MultiValueMap<String, String>> naverProfileRequest =
                new HttpEntity<>(headers);
        ResponseEntity<NaverProfile> naverProfileResponse = rt.exchange(
                "https://openapi.naver.com/v1/nid/me",
                HttpMethod.POST,
                naverProfileRequest,
                NaverProfile.class
        );

        return naverProfileResponse.getBody();
    }

    @Override
    public String saveUserAndGetToken(String token) {
        NaverProfile profile = findProfile(token);

        User user = userRepository.findByEmail(profile.getNaverUserDetail().getEmail()).orElse(null);

        if (user == null) {
            Grade firstGrade = gradeRepository.findByLevel("신입");
            user = User.builder()
                    .email(profile.getNaverUserDetail().getEmail())
                    .birthdate(profile.getNaverUserDetail().getBirthday())
                    .gender(profile.getNaverUserDetail().getGender())
                    .grade(firstGrade)
                    .socialType(SocialType.NAVER)
                    .build();

            userRepository.save(user);
        }

        return createToken(user);
    }

    private String createToken(User user) {
        String jwtToken = JWT.create()
                .withSubject(user.getEmail())
                .withExpiresAt(new Date(System.currentTimeMillis() + JwtProperties.EXPIRATION_TIME))
                .withClaim("id", user.getId())
                .withClaim("nickname", user.getNickname())
                .withClaim("provider", user.getSocialType().name().toLowerCase(Locale.ROOT))
                .sign(Algorithm.HMAC512(JwtProperties.SECRET));

        return jwtToken;
    }
}
