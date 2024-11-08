package com.avengers.example.config;

import com.avengers.example.domain.Account;
import com.avengers.example.domain.Loan;
import com.avengers.example.repository.AccountRepository;
import com.avengers.example.repository.LoanRepository;
import jakarta.transaction.Transactional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.util.Date;

@Configuration
public class TestDatabaseConfig {

    private static final Logger logger = LoggerFactory.getLogger(TestDatabaseConfig.class);

    @Bean
    CommandLineRunner initDatabase(AccountRepository repository, LoanRepository loanRepository) {
        return args -> {
            logger.info("Preloading {}", repository.save(new Account(true, "Tony Stark", "test", "test@mail.com", "123-456-7890")));
            logger.info("Preloading {}", repository.save(new Account(false, "Steve Rogers", "1234", "cap@mail.com", "123-123-1234")));
            logger.info("Preloading {}", loanRepository.save(new Loan(1000, 0.05, 12f, new Date(), repository.findById(2L).orElse(null))));
            logger.info("Preloading {}", loanRepository.save(new Loan(50000, 3270.75, 6.99f, new Date(), repository.findById(2L).orElse(null))));
        };
    }

}
