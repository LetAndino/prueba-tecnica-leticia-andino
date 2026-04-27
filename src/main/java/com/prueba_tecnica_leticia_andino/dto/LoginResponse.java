package com.prueba_tecnica_leticia_andino.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class LoginResponse {
  private String token;
  private String username;
  private String role;
}
