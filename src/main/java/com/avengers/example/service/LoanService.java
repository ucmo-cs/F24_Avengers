package com.avengers.example.service;

import com.avengers.example.domain.Loan;
import com.avengers.example.repository.LoanRepository;
import jakarta.transaction.Transactional;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@AllArgsConstructor
@Service
public class LoanService
{
    private final LoanRepository loanRepository;

    @Transactional
    public Loan create(Loan loan)
    {
        return loanRepository.save(loan);
    }

    public List<Loan> findAll()
    {
        return loanRepository.findAll();
    }
}