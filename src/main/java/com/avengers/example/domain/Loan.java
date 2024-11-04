package com.avengers.example.domain;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

@Data
@Entity
@Getter
@Setter
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


}
