package com.avengers.example.domain;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
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
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;  // primary key for the account table (renamed for compatibility).
    private boolean isAdmin;
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

    public Account(boolean isAdmin, String username, String password, String email, String phoneNumber)
    {
        this.isAdmin = isAdmin;
        this.username = username;
        this.password = password;
        this.email = email;
        this.phoneNumber = phoneNumber;
    }

    /**
     * Sets the type of user account.
     *
     * @param isAdmin (boolean) indicator of administrator account.
     */
    public void setIsAdmin(boolean isAdmin)
    {
        this.isAdmin = isAdmin;
    }

    public void setUsername(String username)
    {
        if (null == username || username == "" || username == " ")
        {
            throw new IllegalArgumentException("Username can not be null or empty!");
        }
        this.username = username;
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
}
