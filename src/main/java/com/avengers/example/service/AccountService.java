package com.avengers.example.service;

import com.avengers.example.domain.Account;
import com.avengers.example.repository.AccountRepository;
import jakarta.transaction.Transactional;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@AllArgsConstructor
@Service
public class AccountService
{
    private final AccountRepository accountRepository;

    @Transactional
    public Account create(Account account)
    {
        return accountRepository.save(account);
    }

    public List<Account> findAll()
    {
        return accountRepository.findAll();
    }

    public Account findByUsernameAndPassword(String username, String password)
    {
        return accountRepository.findByUsernameAndPassword(username, password);
    }
}
