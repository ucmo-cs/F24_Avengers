package com.avengers.example.domain;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
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
}
