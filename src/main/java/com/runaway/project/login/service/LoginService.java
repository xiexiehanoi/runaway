package com.runaway.project.login.service;

import com.runaway.project.login.model.OauthToken;
import com.runaway.project.user.entity.User;
import jakarta.servlet.http.HttpServletRequest;

import java.util.Map;

public interface LoginService {
    OauthToken getAccessToken(String code);
    String saveUserAndGetToken(String token);
    User getMyInfo(HttpServletRequest request);
}
