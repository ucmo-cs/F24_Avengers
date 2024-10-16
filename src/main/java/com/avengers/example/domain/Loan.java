package com.avengers.example.domain;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.Data;

@Data
@Entity
public class Loan
{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long loanId;
    private double originAmount;
    private long interestRate;

    public Loan()
    {
    }

    public Loan(double originAmount, long interestRate)
    {
        this.originAmount = originAmount;
        this.interestRate = interestRate;
    }

    public void setLoanId(Long loanId)
    {
        this.loanId = loanId;
    }

    public Long getLoanId()
    {
        return loanId;
    }

    public void setOriginAmount(double originAmount)
    {
        this.originAmount = originAmount;
    }

    public double getOriginAmount()
    {
        return originAmount;
    }

    public void setInterestRate(long interestRate)
    {
        this.interestRate = interestRate;
    }

    public long getInterestRate()
    {
        return interestRate;
    }
}
