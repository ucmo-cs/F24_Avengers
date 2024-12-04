package com.avengers.example.service;

import com.avengers.example.domain.Account;
import com.avengers.example.domain.AccountUpdate;
import com.avengers.example.domain.Loan;
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

    public Account findByEmailAndPassword(String email, String password)
    {
        return accountRepository.findByEmailAndPassword(email, password);
    }

    public Account findById(long id)
    {
        return accountRepository.findById(id).orElse(null);
    }

    public List<Loan> findLoansByAccountId(long id)
    {
        Account account = accountRepository.findById(id).orElse(null);
        if (null == account)
        {
            return null;
        }
        return account.getLoans();
    }

    public Account update(long id, AccountUpdate account)
    {
        Account existingAccount = accountRepository.findById(id).orElse(null);
        if (null == existingAccount)
        {
            return null;
        }

        if (null != account.email() && !account.email().isEmpty())
        {
            existingAccount.setEmail(account.email());
        }

        if (null != account.phoneNumber() && !account.phoneNumber().isEmpty())
        {
            existingAccount.setPhoneNumber(account.phoneNumber());
        }

        if (null != account.routingNumber() && !account.routingNumber().isEmpty())
        {
            existingAccount.setRoutingNumber(account.routingNumber());
        }

        if (null != account.accountNumber() && !account.accountNumber().isEmpty())
        {
            existingAccount.setAccountNumber(account.accountNumber());
        }
        return accountRepository.save(existingAccount);
    }
}
