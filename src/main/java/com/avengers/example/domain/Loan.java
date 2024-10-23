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
    private Long id; // primary key for the loan table (renamed for compatibility).
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

    public void setId(Long loanId)
    {
        this.id = loanId;
    }

    public Long getId()
    {
        return id;
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
