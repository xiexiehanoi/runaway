package com.runaway.project.login.service;

import com.runaway.project.login.model.OauthToken;
import com.runaway.project.user.entity.User;
import jakarta.servlet.http.HttpServletRequest;

public interface LoginService {
    String createToken(User user);
    OauthToken getAccessToken(String code);
    String saveUserAndGetToken(String token);
    User getUser(HttpServletRequest request);
}
