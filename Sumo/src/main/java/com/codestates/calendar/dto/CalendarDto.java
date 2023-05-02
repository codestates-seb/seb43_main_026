package com.codestates.calendar.dto;

import lombok.Getter;
import lombok.Setter;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Positive;

public class CalendarDto {

    @Getter
    public static class Post {
        @NotBlank
        private String date;

        @NotBlank
        private String imageAddress;

        private String content;

        private String location;

        @Positive
        private long calendarId;
    }

    @Getter
    public static class Patch {
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
