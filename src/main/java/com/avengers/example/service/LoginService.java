package com.avengers.example.service;

import org.springframework.stereotype.Service;

import java.util.Objects;

@Service
public class LoginService {

    private final AccountService accountService;

    public LoginService(AccountService accountService) {
        this.accountService = accountService;
    }

    public boolean isLoginValid(String email, String password) {
        return !Objects.isNull(accountService.findByEmailAndPassword(email, password));
    }

}
