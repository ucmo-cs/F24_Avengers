package com.avengers.example.controller;

import com.avengers.example.domain.Account;
import com.avengers.example.service.AccountService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "http://localhost:3000")
@AllArgsConstructor
@RestController
public class AccountController
{
    private final AccountService accountService;

    /**
     * Creates a new account object and saves it to the database.
     *
     * @param account the account instance to be added to the database.
     * @return The response from the server.
     */
    @PostMapping("/account")
    public ResponseEntity<?> save(@RequestBody Account account)
    {
        return new ResponseEntity<>(accountService.create(account), HttpStatus.CREATED);
    }

    /**
     * @return A response object containing all accounts from the database.
     */
    @GetMapping("/accounts")
    public ResponseEntity<?> findAll()
    {
        return new ResponseEntity<>(accountService.findAll(), HttpStatus.OK);
    }
}
