package com.codestates.member.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Pattern;

@Getter
@Setter
public class MemberDto {

    @Getter
    @Setter
    public static class Post{
        @Email
        @NotBlank(message = "이메일을 입력하여 주십시오.")
        private String email;

        @NotBlank(message = "별명을 입력하여 주십시오.")
        private String nickname;

        @NotBlank(message = "비밀번호를 입력하여 주십시오.")
        @Pattern(regexp = "^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!@#$%^&*])[A-Za-z0-9!@#$%^&*]{8,}$",
                message = "비밀번호는 영대소문자, 숫자, 특수기호(!@#$%^&*)포함 8자 이상이어야 합니다.")
        private String password;
    }

    @Getter
    @Setter
    @Builder
    public static class Patch{
        private long memberId;

        @NotBlank
        private String email;

        @NotBlank
        private String nickname;
    }

    @Getter
    @AllArgsConstructor
    public static class Response{
        private long memberId;
        private String email;
        private String nickname;
    }
}
