package com.runaway.project.login;

public interface JwtProperties {
    String SECRET = "runaway";
    int EXPIRATION_TIME =  864000000;
    String TOKEN_PREFIX = "Bearer ";
    String HEADER_STRING = "Authorization";
}
