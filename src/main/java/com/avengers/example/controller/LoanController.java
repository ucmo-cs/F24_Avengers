package com.avengers.example.controller;

import com.avengers.example.domain.Loan;
import com.avengers.example.service.LoanService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@AllArgsConstructor
@RestController
public class LoanController
{
    private final LoanService loanService;

    /**
     * Creates a new loan object and saves it to the database.
     *
     * @param loan the loan instance to be added to the database.
     * @return The response from the server.
     */
    @PostMapping("/loan")
    public ResponseEntity<?> save(@RequestBody Loan loan)
    {
        return new ResponseEntity<>(loanService.create(loan), HttpStatus.CREATED);
    }

    /**
     * @return A response object containing all loans from the database.
     */
    @GetMapping("/loans")
    public ResponseEntity<?> findAll()
    {
        return new ResponseEntity<>(loanService.findAll(), HttpStatus.OK);
    }

    /**
     * @param id The id of the loan to be retrieved.
     * @return A response object containing the loan with the specified id.
     */
    @GetMapping("/loan/{id}")
    public ResponseEntity<?> findById(@PathVariable Long id)
    {
        Optional<Loan> loan = loanService.findById(id);
        if (loan.isPresent()) {
            return ResponseEntity.ok(loan.get());
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}
