package com.avengers.example.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;

@Entity
@Data
@Getter
@NoArgsConstructor
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

    @OneToMany(mappedBy = "account", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonIgnore
    private List<Loan> loans = new ArrayList<>();

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
        if (null == username || username.isEmpty() || username.equals(" "))
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
        if (null == password || password.isEmpty() || password.equals(" "))
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
        if (null == email || email.isEmpty() || email.equals(" "))
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
        if (null == phoneNumber || phoneNumber.isEmpty() || phoneNumber.equals(" "))
        {
            throw new IllegalArgumentException("Phone Number can not be null or empty!");
        }
        this.phoneNumber = phoneNumber;
    }
}
