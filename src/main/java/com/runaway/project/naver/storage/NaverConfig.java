package com.runaway.project.naver.storage;

import jakarta.annotation.PostConstruct;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Configuration;

import lombok.Data;

@Configuration
@Data
@ConfigurationProperties(prefix = "ncp")
public class NaverConfig {
	private String endPoint;
	private String regionName;
	private String accessKey;
	private String secretKey;

}
