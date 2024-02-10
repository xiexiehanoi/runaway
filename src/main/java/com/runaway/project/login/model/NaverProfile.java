package com.runaway.project.login.model;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@AllArgsConstructor
public class NaverProfile {
    @JsonProperty("resultcode")
    private String resultCode;
    @JsonProperty("message")
    private String message;
    @JsonProperty("response")
    private NaverUserResponse naverUserDetail;

    @Getter
    @NoArgsConstructor
    @AllArgsConstructor
    public static class NaverUserResponse {
        private String id;
        private String age;
        private String gender;
        private String birthday;
        private String name;
        private String email;
    }
}
