package com.avengers.example.domain;

import java.util.Objects;

public record Login(String email, String password)
{
    public Login
    {
        Objects.requireNonNull(email, "Username cannot be null.");
        Objects.requireNonNull(password, "Password cannot be null.");
    }
}
