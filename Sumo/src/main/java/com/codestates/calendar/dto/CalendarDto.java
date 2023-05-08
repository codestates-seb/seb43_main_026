package com.codestates.calendar.dto;

import lombok.Getter;
import lombok.Setter;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Pattern;
import javax.validation.constraints.Positive;
import java.time.LocalDate;
import java.time.LocalTime;

public class CalendarDto {

    @Getter
    @Setter
    public static class Post {
//        @NotBlank(message = "날짜는 필수 항목 입니다.")
        @Pattern(regexp = "^[\\d]{4}-(0[1-9]|1[012])-(0[1-9]|[12][0-9]|3[01])$",
                message = "YYYY-MM-DD 형식으로 작성해야 합니다.")
        private LocalDate date;

        @NotBlank(message = "이미지는 필수 항목 입니다.")
        private String imageAddress;

        private String content;

        private String location;

        @Pattern(regexp = "^([1-9]|[01][0-9]|2[0-3]):([0-5][0-9])$",
                message = "HH:mm 형식으로 작성해야 합니다.")
        private LocalTime beginTime;

        @Pattern(regexp = "^([1-9]|[01][0-9]|2[0-3]):([0-5][0-9])$",
                message = "HH:mm 형식으로 작성해야 합니다.")
        private LocalTime endTime;

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


        // 시간 필드를 옵셔널하게 할려면 어떻게 해야하는가??
        @Pattern(regexp = "^([1-9]|[01][0-9]|2[0-3]):([0-5][0-9])$",
                message = "HH:mm 형식으로 작성해야 합니다.")
        private LocalTime beginTime;

        @Pattern(regexp = "^([1-9]|[01][0-9]|2[0-3]):([0-5][0-9])$",
                message = "HH:mm 형식으로 작성해야 합니다.")
        private LocalTime endTime;
    }

    @Setter
    public static class Response {
        private long calendarContentId;

        private LocalDate date;

        private String imageAddress;

        private String content;

        private String location;

        private LocalTime beginTime;

        private LocalTime endTime;

        private long calendarId;
    }
}
