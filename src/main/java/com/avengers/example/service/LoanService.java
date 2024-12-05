package com.avengers.example.service;

import com.avengers.example.domain.Loan;
import com.avengers.example.repository.LoanRepository;
import jakarta.transaction.Transactional;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

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

    public Optional<Loan> findById(Long id)
    {
        return loanRepository.findById(id);
    }
}
