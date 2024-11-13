package com.avengers.example.domain;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.Objects;

import static org.junit.jupiter.api.Assertions.assertThrows;

@SpringBootTest
public class AccountTests
{
    private Account testAccount;
    private final long acctId = 1L;
    private final boolean isAdmin = false;
    private final String username = "user";
    private final String password = "pass";
    private final String email = "email@email.com";
    private final String phonenumber = "(111)111-1111";

    @BeforeEach
    public void setup()
    {
        testAccount = new Account(isAdmin, username, password, email, phonenumber);
    }

    @Test
    public void testNoArgumentConstructor()
    {
        Account account = new Account();
        assert Objects.nonNull(account);
    }

    @Test
    public void testAllArgumentConstructor()
    {
        assert testAccount != null;
    }

    @Test
    public void testSetIsAdmin()
    {
        testAccount.setAdmin(false);
        assert !testAccount.isAdmin();
    }

    @Test
    public void testSetUserName()
    {
        testAccount.setUsername("test");
        assert Objects.equals(testAccount.getUsername(), "test");
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
        assert Objects.equals(testAccount.getPassword(), "test");
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
        assert Objects.equals(testAccount.getPhoneNumber(), "test");
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
        assert Objects.equals(testAccount.getEmail(), "test");
    }

    @Test
    public void testSetEmail_NullEmail()
    {
        assertThrows(IllegalArgumentException.class, () -> testAccount.setEmail(null));
    }
}
