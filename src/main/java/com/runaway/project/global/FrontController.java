package com.runaway.project.global;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class FrontController {

    @GetMapping(value = { "/login/oauth2/callback/kakao", "/home", "/running", "/signup"})
    public String forward() {
        return "forward:/index.html";
    }
}
