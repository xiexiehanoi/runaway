package com.runaway.project.oauth2;

import org.springframework.context.annotation.Configuration;
import org.springframework.security.oauth2.client.registration.InMemoryClientRegistrationRepository;

@Configuration
public class CustomClientRegistrationRepository {
    private final SocialClientRegistration socialClientRegistration;

    public CustomClientRegistrationRepository(SocialClientRegistration socialClientRegistration) {
        this.socialClientRegistration = socialClientRegistration;
    }

    public InMemoryClientRegistrationRepository clientRegistrationRepository() {
        return new InMemoryClientRegistrationRepository(
                socialClientRegistration.naverClientRegistration(),
                socialClientRegistration.googleClientRegistration()
        );
    }
}
