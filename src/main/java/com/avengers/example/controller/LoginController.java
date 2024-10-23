package com.avengers.example.controller;

import com.avengers.example.domain.Login;
import com.avengers.example.service.LoginService;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class LoginController {
    private final LoginService loginService;

    public LoginController(LoginService loginService) {
        this.loginService = loginService;
    }

    @PostMapping("/login")
    public boolean login(@RequestBody Login login) {
        return loginService.isLoginValid(login.username(), login.password());
    }
}
