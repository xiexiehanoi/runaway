package com.runaway.project.login.service;

import com.runaway.project.user.entity.User;

public interface LoginService {
    String createToken(User user);
    String saveUserAndGetToken(String token);
}
