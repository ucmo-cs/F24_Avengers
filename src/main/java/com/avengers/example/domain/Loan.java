package com.avengers.example.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Entity
@Data
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

    @OneToMany(mappedBy = "loan", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonIgnore
    private List<Payment> payments = new ArrayList<>();

    public Loan()
    {
    }

    public Loan(double originAmount, float interestRate)
    {
        this.originAmount = originAmount;
        this.interestRate = interestRate;
    }

    public Loan(double originAmount, double currentAmount, float interestRate, Date date, Account account)
    {
        this.originAmount = originAmount;
        this.currentAmount = currentAmount;
        this.interestRate = interestRate;
        this.date = date;
        this.account = account;
    }

    @Override
    public String toString() {
        return "Loan{" +
                "id=" + id +
                ", originAmount=" + originAmount +
                ", currentAmount=" + currentAmount +
                ", interestRate=" + interestRate +
                ", date=" + date +
                ", account=" + account +
                '}';
    }
}
