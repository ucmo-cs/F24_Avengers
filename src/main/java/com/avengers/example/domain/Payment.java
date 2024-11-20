package com.avengers.example.domain;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.Data;
import lombok.Getter;

import java.util.Date;

@Entity
@Data
@Getter
public class Payment
{
    private float paymentAmount;
    private Date paymentDate;
    private long loanId;
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    public Payment(float paymentAmount, Date paymentDate, long loanId)
    {
        this.paymentAmount = paymentAmount;
        this.paymentDate = paymentDate;
        this.loanId = loanId;
    }

    public Payment()
    {
    }

    public void setId(Long id)
    {
        this.id = id;
    }

    public Long getId()
    {
        return id;
    }
}
