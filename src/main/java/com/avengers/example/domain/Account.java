package com.avengers.example.domain;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;


@Entity
@Data
@Getter

public class Account
{
    @Id
    private long acctId;
    private int userType;
    private String username;
    private String password;
    private String email;
    private String phoneNumber;

    public Account()
    {
    }

    public Account(long acctId, int userType, String username, String password, String email, String phoneNumber)
    {
        this.acctId = acctId;
        this.userType = userType;
        this.username = username;
        this.password = password;
        this.email = email;
        this.phoneNumber = phoneNumber;
    }

    public void setUserType(int userType)
    {
        this.userType = userType;
    }

    public void setUsername(String username)
    {
        if (null == username || username == "" || username == " ")
        {
            throw new IllegalArgumentException("Username can not be null or empty!");
        }
        this.username = username;
    }


    public void setPassword(String password)
    {
        if (null == password || password == "" || password == " ")
        {
            throw new IllegalArgumentException("Password can not be null or empty!");
        }
        this.password = password;
    }


    public void setEmail(String email)
    {
        if (null == email || email == "" || email == " ")
        {
            throw new IllegalArgumentException("Email can not be null or empty!");
        }
        this.email = email;
    }


    public void setPhoneNumber(String phoneNumber)
    {
        if (null == phoneNumber || phoneNumber == "" || phoneNumber == " ")
        {
            throw new IllegalArgumentException("Phone Number can not be null or empty!");
        }
        this.phoneNumber = phoneNumber;
    }

}
