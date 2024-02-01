package com.runaway.project.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
@ResponseBody
public class LoginController {
    @GetMapping("/my")
    public String myPage() {

        return "my";
    }

    @GetMapping("/login")
    public String loginPage(){
        return "LoginPage";
    }
}