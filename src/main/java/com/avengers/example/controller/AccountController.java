package com.avengers.example.controller;

import com.avengers.example.domain.Account;
import com.avengers.example.service.AccountService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@AllArgsConstructor
@RestController
public class AccountController
{
    private final AccountService accountService;

    @PostMapping("/account")
    public ResponseEntity<?> save(@RequestBody Account account)
    {
        return new ResponseEntity<>(accountService.create(account), HttpStatus.CREATED);
    }

    @GetMapping("/accounts")
    public ResponseEntity<?> findAll()
    {
        return new ResponseEntity<>(accountService.findAll(), HttpStatus.OK);
    }
}
