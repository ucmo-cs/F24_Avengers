package com.avengers.example.repository;

import com.avengers.example.domain.Payment;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface PaymentRepository extends JpaRepository<Payment, Long>
{
    List<Payment> findAllByLoanId(Long loanId);
}
