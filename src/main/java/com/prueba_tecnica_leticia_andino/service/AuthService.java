package com.prueba_tecnica_leticia_andino.service;

import com.prueba_tecnica_leticia_andino.dto.UserAccount;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

@Service
public class AuthService {
    // Base de datos simulada
    private final Map<String, UserAccount> users = new HashMap<>();

    public AuthService() {
        users.put("admin", new UserAccount("admin", "admin123", "ADMIN"));
        users.put("user", new UserAccount("user", "user123", "USER"));
    }

    public Optional<UserAccount> findByUsername(String username) {
        return Optional.ofNullable(users.get(username));
    }
}