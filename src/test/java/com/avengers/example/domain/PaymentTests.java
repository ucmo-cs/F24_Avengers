package com.avengers.example.domain;

import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.Date;

@SpringBootTest
public class PaymentTests
{
    private Payment testPayment;
    private float testPaymentAmount = 1.10f;
    private Date testPaymentDate = new Date();

    @Test
    public void testConstructor()
    {
        testPayment = new Payment(testPaymentAmount, testPaymentDate);

        assert testPayment.getPaymentAmount() == testPaymentAmount;
        assert testPayment.getPaymentDate() == testPaymentDate;
    }
}
