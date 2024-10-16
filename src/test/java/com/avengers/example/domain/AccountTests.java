package com.avengers.example.domain;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;

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
        testAccount = new Account(acctId, userType, username, password, email, phonenumber);
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
}
