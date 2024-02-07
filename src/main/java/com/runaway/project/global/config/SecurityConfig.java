package com.runaway.project.global.config;

import com.runaway.project.global.oauth2.CustomClientRegistrationRepository;
import com.runaway.project.login.service.CustomOAuth2UserService;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    private final CustomOAuth2UserService customOAuth2UserService;
    private final CustomClientRegistrationRepository customClientRegistrationRepository;

    public SecurityConfig(CustomOAuth2UserService customOAuth2UserService, CustomClientRegistrationRepository customClientRegistrationRepository) {

        this.customOAuth2UserService = customOAuth2UserService;
        this.customClientRegistrationRepository = customClientRegistrationRepository;
    }

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception{

        http
                .csrf((csrf) -> csrf.disable());

        http
                .formLogin((login) -> login.disable());

        http
                .httpBasic((basic) -> basic.disable());

        http
                .oauth2Login((oauth2) -> oauth2
                        .loginPage("/login")
                        .clientRegistrationRepository(customClientRegistrationRepository.clientRegistrationRepository())
                        .userInfoEndpoint((userInfoEndpointConfig) -> userInfoEndpointConfig
                                .userService(customOAuth2UserService)));


//        http.authorizeHttpRequests((auth) -> auth
//            .requestMatchers("/", "/static/**", "/public/**","/oauth2/**", "/login/**").permitAll()
//            .anyRequest().authenticated());
//



        return http.build();
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }
}