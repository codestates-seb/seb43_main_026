package com.codestates.jwt.auth.dto;

import lombok.Getter;

@Getter
public class LoginDto {
    private String username;
    private String password;
}
