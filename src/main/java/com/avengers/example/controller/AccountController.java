package com.avengers.example.controller;

import com.avengers.example.domain.Account;
import com.avengers.example.domain.AccountUpdate;
import com.avengers.example.service.AccountService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

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

    //post route to update account
    @PutMapping("/account/{id}")
    public ResponseEntity<?> update(@PathVariable long id, @RequestBody AccountUpdate account)
    {
        return new ResponseEntity<>(accountService.update(id, account), HttpStatus.OK);
    }

    /**
     * @return A response object containing all accounts from the database.
     */
    @GetMapping("/accounts")
    public ResponseEntity<?> findAll()
    {
        return new ResponseEntity<>(accountService.findAll(), HttpStatus.OK);
    }

    @GetMapping("/account/{id}")
    public ResponseEntity<?> findById(@PathVariable long id)
    {
        return new ResponseEntity<>(accountService.findById(id), HttpStatus.OK);
    }

    @GetMapping("/account/{id}/loans")
    public ResponseEntity<?> findLoansByAccountId(@PathVariable long id)
    {
        return new ResponseEntity<>(accountService.findLoansByAccountId(id), HttpStatus.OK);
    }
}
