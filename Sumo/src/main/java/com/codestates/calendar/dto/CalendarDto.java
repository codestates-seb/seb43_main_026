package com.codestates.calendar.dto;

import lombok.Getter;
import lombok.Setter;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Positive;

public class CalendarDto {

    @Getter
    @Setter
    public static class Post {
        @NotBlank(message = "날짜는 필수 항목 입니다.")
        private String date;

        @NotBlank(message = "이미지는 필수 항목 입니다.")
        private String imageAddress;

        private String content;

        private String location;

        @Positive(message = "calendarId는 올바른 값이어야 합니다.")
        private long calendarId;
    }

    @Getter
    @Setter
    public static class Patch {
        @Positive(message = "calendarContentId는 올바른 값이어야 합니다.")
        private long calendarContentId;

        private String imageAddress;

        private String content;

        private String location;
    }

    @Setter
    public static class Response {
        private long calendarContentId;

        private String date;

        private String imageAddress;

        private String content;

        private String location;

        private long calendarId;
    }
}
