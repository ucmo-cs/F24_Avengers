package com.avengers.example.domain;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;
import jakarta.persistence.*;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

import java.util.Date;

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
    private double currentAmount;
    private float interestRate;
    private Date date;


    @ManyToOne
    @JoinColumn(name = "account_id")
    private Account account;

    public Loan()
    {
    }

    public Loan(double originAmount, float interestRate)
    {
        this.originAmount = originAmount;
        this.interestRate = interestRate;
    }

    public Loan(double originAmount, double currentAmount, float interestRate, Date date)
    {
        this.originAmount = originAmount;
        this.currentAmount = currentAmount;
        this.interestRate = interestRate;
        this.date = date;
    }
}
