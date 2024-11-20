package com.avengers.example.service;

import com.avengers.example.domain.Payment;
import com.avengers.example.repository.PaymentRepository;
import jakarta.transaction.Transactional;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@AllArgsConstructor
@Service
public class PaymentService
{
    private final PaymentRepository paymentRepository;

    @Transactional
    public Payment create(Payment payment)
    {
        return paymentRepository.save(payment);
    }

    public List<Payment> findAllByLoan(Long loanId) {
        return paymentRepository.findAllByLoanId(loanId);
    }

    public List<Payment> findAll()
    {
        return paymentRepository.findAll();
    }
}
