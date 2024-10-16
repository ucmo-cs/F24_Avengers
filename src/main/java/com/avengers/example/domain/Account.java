package com.avengers.example.domain;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.Data;

@Entity
@Data
public class Account
{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long acctId;
    private int userType;
    private String username;
    private String password;
    private String email;
    private String phoneNumber;

    public Account()
    {
    }

    public Account(int userType, String username, String password, String email, String phoneNumber)
    {
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

    public int getUserType()
    {
        return userType;
    }

    public void setUsername(String username)
    {
        if (null == username || username == "" || username == " ")
        {
            throw new IllegalArgumentException("Username can not be null or empty!");
        }
        this.username = username;
    }

    public String getUsername()
    {
        return username;
    }

    public void setPassword(String password)
    {
        if (null == password || password == "" || password == " ")
        {
            throw new IllegalArgumentException("Password can not be null or empty!");
        }
        this.password = password;
    }

    public String getPassword()
    {
        return password;
    }

    public void setEmail(String email)
    {
        if (null == email || email == "" || email == " ")
        {
            throw new IllegalArgumentException("Email can not be null or empty!");
        }
        this.email = email;
    }

    public String getEmail()
    {
        return email;
    }

    public void setPhoneNumber(String phoneNumber)
    {
        if (null == phoneNumber || phoneNumber == "" || phoneNumber == " ")
        {
            throw new IllegalArgumentException("Phone Number can not be null or empty!");
        }
        this.phoneNumber = phoneNumber;
    }

    public String getPhoneNumber()
    {
        return phoneNumber;
    }
}
