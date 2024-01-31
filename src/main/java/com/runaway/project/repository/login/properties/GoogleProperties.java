package com.runaway.project.repository.login.properties;

import lombok.Data;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Configuration;

@Data
@Configuration
@ConfigurationProperties(prefix = "google")
public class GoogleProperties {

    private String clientName;
    private String clientId;
    private String clientSecret;
    private String redirectUri;
    private String authorizationGrantType;
    private String scope;

}
