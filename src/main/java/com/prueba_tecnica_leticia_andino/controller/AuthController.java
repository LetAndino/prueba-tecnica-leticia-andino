package com.prueba_tecnica_leticia_andino.controller;

import com.prueba_tecnica_leticia_andino.dto.LoginRequest;
import com.prueba_tecnica_leticia_andino.dto.LoginResponse;
import com.prueba_tecnica_leticia_andino.dto.UserAccount;
import com.prueba_tecnica_leticia_andino.security.JwtUtil;
import com.prueba_tecnica_leticia_andino.service.AuthService;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequiredArgsConstructor
public class AuthController {

    private final AuthService authService;
    private final JwtUtil jwtUtil;

    @PostMapping("/login")
    public ResponseEntity<?> login(@Valid @RequestBody LoginRequest request,
                                   HttpServletResponse response) {
        UserAccount user = authService.findByUsername(request.getUsername())
                .filter(u -> u.getPassword().equals(request.getPassword()))
                .orElse(null);

        if (user == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(Map.of("message", "Credenciales inválidas"));
        }

        String token = jwtUtil.generateToken(user.getUsername(), user.getRole());

        // Cookie para web
        Cookie cookie = new Cookie("jwt", token);
        cookie.setHttpOnly(true);
        cookie.setPath("/");
        cookie.setMaxAge(86400);
        response.addCookie(cookie);

        // Token en payload para mobile
        return ResponseEntity.ok(new LoginResponse(token, user.getUsername(), user.getRole()));
    }

    @GetMapping("/profile")
    public ResponseEntity<?> profile(@AuthenticationPrincipal String username) {
        return authService.findByUsername(username)
                .map(u -> ResponseEntity.ok(Map.of(
                        "username", u.getUsername(),
                        "role", u.getRole()
                )))
                .orElse(ResponseEntity.status(HttpStatus.UNAUTHORIZED).build());
    }
}
