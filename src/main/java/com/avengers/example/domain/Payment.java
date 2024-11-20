package com.avengers.example.domain;

import jakarta.persistence.*;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

import java.util.Date;

@Entity
@Data
@Getter
@Setter
public class Payment
{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private float paymentAmount;
    private Date paymentDate;

    @ManyToOne
    @JoinColumn(name = "loan_id")
    private Loan loan;

    public Payment(float paymentAmount, Date paymentDate, Loan loan)
    {
        this.paymentAmount = paymentAmount;
        this.paymentDate = paymentDate;
        this.loan = loan;
    }

    public Payment(float paymentAmount, Date paymentDate)
    {
        this.paymentAmount = paymentAmount;
        this.paymentDate = paymentDate;
    }

    public Payment()
    {
    }

}
