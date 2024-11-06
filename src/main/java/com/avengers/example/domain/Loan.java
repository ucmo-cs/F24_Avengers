package com.avengers.example.domain;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;
import jakarta.persistence.*;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

@Data
@Entity
@Getter
@Setter
@JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class, property = "id")
public class Loan
{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id; // primary key for the loan table (renamed for compatibility).
    private double originAmount;
    private long interestRate;

    @ManyToOne
    @JoinColumn(name = "account_id")
    private Account account;

    public Loan()
    {
    }

    public Loan(double originAmount, long interestRate)
    {
        this.originAmount = originAmount;
        this.interestRate = interestRate;
    }
}
