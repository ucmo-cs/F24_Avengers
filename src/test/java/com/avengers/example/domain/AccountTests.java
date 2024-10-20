package com.avengers.example.domain;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;

import static org.junit.jupiter.api.Assertions.assertThrows;

@SpringBootTest
public class AccountTests
{
    private Account testAccount;
    private long acctId = 1L;
    private int userType = 1;
    private String username = "user";
    private String password = "pass";
    private String email = "email@email.com";
    private String phonenumber = "(111)111-1111";

    @BeforeEach
    public void setup()
    {
        testAccount = new Account(userType, username, password, email, phonenumber);
    }

    @Test
    public void testNoArgumentConstructor()
    {
        Account account = new Account();
        assert account != null;
    }

    @Test
    public void testAllArgumentConstructor()
    {
        assert testAccount != null;
    }

    @Test
    public void testSetUserType()
    {
        testAccount.setUserType(2);
        assert testAccount.getUserType() == 2;
    }

    @Test
    public void testSetUserName()
    {
        testAccount.setUsername("test");
        assert testAccount.getUsername() == "test";
    }

    @Test
    public void testSetUserName_NullUserName()
    {
        assertThrows(IllegalArgumentException.class, () -> testAccount.setUsername(null));
    }

    @Test
    public void testSetPassword()
    {
        testAccount.setPassword("test");
        assert testAccount.getPassword() == "test";
    }

    @Test
    public void testSetPassword_NullPassword()
    {
        assertThrows(IllegalArgumentException.class, () -> testAccount.setPassword(null));
    }

    @Test
    public void testSetPhoneNumber()
    {
        testAccount.setPhoneNumber("test");
        assert testAccount.getPhoneNumber() == "test";
    }

    @Test
    public void testSetPhoneNumber_NullPhoneNumber()
    {
        assertThrows(IllegalArgumentException.class, () -> testAccount.setPhoneNumber(null));
    }

    @Test
    public void testSetEmail()
    {
        testAccount.setEmail("test");
        assert testAccount.getEmail() == "test";
    }

    @Test
    public void testSetEmail_NullEmail()
    {
        assertThrows(IllegalArgumentException.class, () -> testAccount.setEmail(null));
    }
}
