package com.avengers.example.controller;

import com.avengers.example.domain.Payment;
import com.avengers.example.service.PaymentService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class PaymentController
{
    private final PaymentService paymentService;

    public PaymentController(PaymentService paymentService)
    {
        this.paymentService = paymentService;
    }

    /**
     * Creates a new payment object and saves it to the database.
     *
     * @param payment the payment instance to be added to the database.
     * @return The response from the server.
     */
    @PostMapping("/payment")
    public ResponseEntity<?> save(@RequestBody Payment payment)
    {
        return new ResponseEntity<>(paymentService.create(payment), HttpStatus.CREATED);
    }

    /**
     * @return A response object containing all payments from the database.
     */
    @GetMapping("/payments")
    public ResponseEntity<?> findAll()
    {
        return new ResponseEntity<>(paymentService.findAll(), HttpStatus.OK);
    }
}
