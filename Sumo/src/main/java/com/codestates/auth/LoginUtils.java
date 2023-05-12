package com.codestates.auth;

import com.codestates.exception.BusinessLogicException;
import com.codestates.exception.ExceptionCode;
import org.springframework.security.core.context.SecurityContextHolder;

// @component 테스트해보기!!
public class LoginUtils {
    public static String checkLogin() {
        try {
            String email = SecurityContextHolder.getContext().getAuthentication().getName();
            return email;
        } catch (NullPointerException e) {
            throw new BusinessLogicException(ExceptionCode.MEMBER_NOT_LOGIN);
        }
    }
}