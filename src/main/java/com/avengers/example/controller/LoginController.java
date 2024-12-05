package com.avengers.example.controller;

import com.avengers.example.domain.Account;
import com.avengers.example.domain.Login;
import com.avengers.example.service.AccountService;
import com.avengers.example.service.LoginService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class LoginController {
    private final LoginService loginService;
    private final AccountService accountService;

    public LoginController(LoginService loginService, AccountService accountService) {
        this.loginService = loginService;
        this.accountService = accountService;
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Login login) {
        boolean isValid = loginService.isLoginValid(login.email(), login.password());
        Account account = accountService.findByEmailAndPassword(login.email(), login.password());
        return new ResponseEntity<>(account, isValid ? HttpStatus.OK : HttpStatus.UNAUTHORIZED);
    }
}
