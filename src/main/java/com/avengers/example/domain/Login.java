package com.avengers.example.domain;

import java.util.Objects;

public record Login(String username, String password)
{
    public Login
    {
        Objects.requireNonNull(username, "Username cannot be null.");
        Objects.requireNonNull(password, "Password cannot be null.");
    }
}
