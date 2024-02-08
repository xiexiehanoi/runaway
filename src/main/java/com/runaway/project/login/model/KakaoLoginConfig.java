package com.runaway.project.login.model;

import com.runaway.project.global.factory.YamlPropertySourceFactory;
import lombok.Data;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.PropertySource;

@Configuration
@Data
@RequiredArgsConstructor
@ConfigurationProperties(prefix = "social-login.kakao")
@PropertySource(value = "classpath:application.yml", factory = YamlPropertySourceFactory.class)
public class KakaoLoginConfig {
    private String clientId;
    private String clientSecret;
    private String redirectUri;
}