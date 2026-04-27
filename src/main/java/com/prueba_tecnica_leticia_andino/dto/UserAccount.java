package com.prueba_tecnica_leticia_andino.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class UserAccount {
  private String username;
  private String password;
  private String role;
}
