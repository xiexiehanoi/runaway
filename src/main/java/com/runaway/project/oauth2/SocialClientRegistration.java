package com.runaway.project.oauth2;

import com.runaway.project.repository.login.properties.GoogleProperties;
import com.runaway.project.repository.login.properties.NaverProperties;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.oauth2.client.registration.ClientRegistration;
import org.springframework.security.oauth2.core.AuthorizationGrantType;
import org.springframework.security.oauth2.core.oidc.IdTokenClaimNames;
import org.springframework.stereotype.Component;

@Component
public class SocialClientRegistration {
    @Autowired
    private GoogleProperties googleProperties;

    @Autowired
    private NaverProperties naverProperties;

        public ClientRegistration naverClientRegistration() {

            return ClientRegistration.withRegistrationId("naver")
                    .clientId(naverProperties.getClientId())
                    .clientSecret(naverProperties.getClientSecret())
                    .redirectUri(naverProperties.getRedirectUri())
                    .authorizationGrantType(AuthorizationGrantType.AUTHORIZATION_CODE)
                    .scope(naverProperties.getScope())
                    .authorizationUri("https://nid.naver.com/oauth2.0/authorize")
                    .tokenUri("https://nid.naver.com/oauth2.0/token")
                    .userInfoUri("https://openapi.naver.com/v1/nid/me")
                    .userNameAttributeName("response")
                    .build();
        }

        public ClientRegistration googleClientRegistration() {

            return ClientRegistration.withRegistrationId("google")
                    .clientId(googleProperties.getClientId())
                    .clientSecret(googleProperties.getClientSecret())
                    .redirectUri(googleProperties.getRedirectUri())
                    .authorizationGrantType(AuthorizationGrantType.AUTHORIZATION_CODE)
                    .scope(googleProperties.getScope())
                    .authorizationUri("https://accounts.google.com/o/oauth2/v2/auth")
                    .tokenUri("https://www.googleapis.com/oauth2/v4/token")
                    .jwkSetUri("https://www.googleapis.com/oauth2/v3/certs")
                    .issuerUri("https://accounts.google.com")
                    .userInfoUri("https://www.googleapis.com/oauth2/v3/userinfo")
                    .userNameAttributeName(IdTokenClaimNames.SUB)
                    .build();
        }
}
