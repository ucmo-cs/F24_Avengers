package com.avengers.example;

import com.avengers.example.domain.Account;
import com.avengers.example.repository.AccountRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class LoadFakeDatabase {

    private static final Logger logger = LoggerFactory.getLogger(LoadFakeDatabase.class);

    @Bean
    CommandLineRunner initDatabase(AccountRepository repository) {
        return args -> {
            logger.info("Preloading {}", repository.save(new Account(1, 0, "Tony Stark", "123", "ts@fake.mail", "123-456-7890")));
        };
    }

}
