package com.runaway.project.login.service;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.runaway.project.login.JwtProperties;
import com.runaway.project.login.model.GoogleLoginConfig;
import com.runaway.project.login.model.GoogleProfile;
import com.runaway.project.login.model.OauthToken;
import com.runaway.project.user.entity.User;
import com.runaway.project.user.enums.SocialType;
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
@EnableConfigurationProperties(GoogleLoginConfig.class)
public class GoogleLoginService implements LoginService {
    @Autowired private GoogleLoginConfig googleLoginConfig;
    @Autowired private UserRepository userRepository;

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
        params.add("client_id", googleLoginConfig.getClientId());
        params.add("redirect_uri", googleLoginConfig.getRedirectUri());
        params.add("code", code);
        params.add("client_secret", googleLoginConfig.getClientSecret());

        HttpEntity<MultiValueMap<String, String>> googleTokenRequest =
                new HttpEntity<>(params, headers);

        ResponseEntity<String> accessTokenResponse = rt.exchange(
                "https://oauth2.googleapis.com/token",
                HttpMethod.POST,
                googleTokenRequest,
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

    private GoogleProfile findProfile(String token) {
        RestTemplate rt = new RestTemplate();

        HttpHeaders headers = new HttpHeaders();
        headers.add("Authorization", "Bearer " + token);
        headers.add("Content-type", "application/x-www-form-urlencoded;charset=utf-8");

        HttpEntity<MultiValueMap<String, String>> googleProfileRequest =
                new HttpEntity<>(headers);
        ResponseEntity<String> googleProfileResponse = rt.exchange(
                "https://www.googleapis.com/oauth2/v2/userinfo",
                HttpMethod.GET,
                googleProfileRequest,
                String.class
        );
        ObjectMapper objectMapper = new ObjectMapper();
        GoogleProfile googleProfile = null;
        try {
            googleProfile = objectMapper.readValue(googleProfileResponse.getBody(), GoogleProfile.class);
        } catch (JsonProcessingException e) {
            e.printStackTrace();
        }

        return googleProfile;
    }

    @Override
    public String saveUserAndGetToken(String token) {
        GoogleProfile profile = findProfile(token);

        User user = userRepository.findByEmail(profile.getEmail()).orElse(null);

        if (user == null) {
            user = User.builder()
                    .email(profile.getEmail())
                    .username(profile.getName())
                    .imageUrl(profile.getPicture())
                    .socialType(SocialType.GOOGLE)
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
