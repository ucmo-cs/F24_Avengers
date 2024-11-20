package com.avengers.example.service;

import com.avengers.example.domain.Account;
import com.avengers.example.domain.Payment;
import com.avengers.example.repository.PaymentRepository;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PaymentService
{
    private final PaymentRepository paymentRepository;

    public PaymentService(PaymentRepository paymentRepository)
    {
        this.paymentRepository = paymentRepository;
    }

    @Transactional
    public Payment create(Payment payment)
    {
        return paymentRepository.save(payment);
    }

    public List<Payment> findAll()
    {
        return paymentRepository.findAll();
    }
}
