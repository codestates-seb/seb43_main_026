package com.codestates.auth;

import com.codestates.exception.BusinessLogicException;
import com.codestates.exception.ExceptionCode;
import org.springframework.security.core.context.SecurityContextHolder;


public class LoginUtils {
    public static String checkLogin() {
        String email = SecurityContextHolder.getContext().getAuthentication().getName();

        if (email.equals("anonymousUser")) {
            throw new BusinessLogicException(ExceptionCode.MEMBER_NOT_LOGIN);
        }

        return email;
    }
}