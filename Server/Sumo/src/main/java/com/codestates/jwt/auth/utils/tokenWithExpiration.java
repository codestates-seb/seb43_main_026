package com.codestates.jwt.auth.utils;

import lombok.AllArgsConstructor;
import lombok.Getter;

import java.util.Date;

@Getter
@AllArgsConstructor
public class tokenWithExpiration {
    private String token;
    private Date date;
}
