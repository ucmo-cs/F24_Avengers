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

    /**
     * No argument constructor for account object.
     */
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

    /**
     * Sets the type of user account.
     *
     * @param userType (int) type of user account.
     */
    public void setUserType(int userType)
    {
        this.userType = userType;
    }

    /**
     * @return (int) the type of user account
     */
    public int getUserType()
    {
        return userType;
    }

    /**
     * Sets the username of the account.
     *
     * @param username (String) username of the account.
     */
    public void setUsername(String username)
    {
        if (null == username || username == "" || username == " ")
        {
            throw new IllegalArgumentException("Username can not be null or empty!");
        }
        this.username = username;
    }

    /**
     * @return (String) username of the account.
     */
    public String getUsername()
    {
        return username;
    }

    /**
     * Sets the password of the account.
     *
     * @param password (String) account password.
     */
    public void setPassword(String password)
    {
        if (null == password || password == "" || password == " ")
        {
            throw new IllegalArgumentException("Password can not be null or empty!");
        }
        this.password = password;
    }

    /**
     * @return (String) account password.
     */
    public String getPassword()
    {
        return password;
    }

    /**
     * Sets the email on the account.
     *
     * @param email (String) account email.
     */
    public void setEmail(String email)
    {
        if (null == email || email == "" || email == " ")
        {
            throw new IllegalArgumentException("Email can not be null or empty!");
        }
        this.email = email;
    }

    /**
     * @return (String) account email.
     */
    public String getEmail()
    {
        return email;
    }

    /**
     * Sets the phone number of the account.
     *
     * @param phoneNumber (String) account phone number.
     */
    public void setPhoneNumber(String phoneNumber)
    {
        if (null == phoneNumber || phoneNumber == "" || phoneNumber == " ")
        {
            throw new IllegalArgumentException("Phone Number can not be null or empty!");
        }
        this.phoneNumber = phoneNumber;
    }

    /**
     * @return (String) account phone number.
     */
    public String getPhoneNumber()
    {
        return phoneNumber;
    }
}
