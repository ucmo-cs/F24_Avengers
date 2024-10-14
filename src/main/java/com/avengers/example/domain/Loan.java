package com.avengers.example.domain;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import lombok.Data;

@Data
@Entity
public class Loan
{
    @Id
    private Long loanId;
    private double originAmount;
    private long interestRate;

    public Loan()
    {
    }

    public Loan(Long loanId, double originAmount, long interestRate)
    {
        this.loanId = loanId;
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
