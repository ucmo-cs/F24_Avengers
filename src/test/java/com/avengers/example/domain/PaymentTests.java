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
    private long testLoanId = 1;

    @Test
    public void testConstructor()
    {
        testPayment = new Payment(testPaymentAmount, testPaymentDate, testLoanId);

        assert testPayment.getPaymentAmount() == testPaymentAmount;
        assert testPayment.getLoanId() == testLoanId;
        assert testPayment.getPaymentDate() == testPaymentDate;
    }
}
