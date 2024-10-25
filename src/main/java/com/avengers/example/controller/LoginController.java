package com.avengers.example.controller;

import com.avengers.example.domain.Login;
import com.avengers.example.service.LoginService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
public class LoginController {
    private final LoginService loginService;

    public LoginController(LoginService loginService) {
        this.loginService = loginService;
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Login login) {
        boolean isValid = loginService.isLoginValid(login.email(), login.password());
        return new ResponseEntity<>(isValid ? HttpStatus.OK : HttpStatus.UNAUTHORIZED);
    }
}
