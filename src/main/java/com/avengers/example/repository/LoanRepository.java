package com.avengers.example.repository;

import com.avengers.example.domain.Loan;
import org.springframework.data.jpa.repository.JpaRepository;

public interface LoanRepository extends JpaRepository<Loan, Long>
{
}
