package com.codestates.calendar.dto;

import lombok.Getter;
import lombok.Setter;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Pattern;

public class CalendarContentDto {

    @Getter
    @Setter
    public static class Post {
        @NotBlank(message = "날짜는 필수 항목입니다.")
        @Pattern(regexp = "^[\\d]{4}-(0[1-9]|1[012])-(0[1-9]|[12][0-9]|3[01])$",
                message = "YYYY-MM-DD 형식으로 작성해야 합니다.")
        private String date;

        @NotBlank(message = "이미지는 필수 항목입니다.")
        private String imageAddress;

        private String content;

        private String location;

        @NotBlank(message = "운동 시작 시간은 필수 항목입니다.")
        @Pattern(regexp = "^([01][0-9]|2[0-3]):([0-5][0-9])$",
                message = "HH:mm 형식으로 작성해야 합니다.")
        private String beginTime;

        @NotBlank(message = "운동 종료 시간은 필수 항목입니다.")
        @Pattern(regexp = "^([01][0-9]|2[0-3]):([0-5][0-9])$",
                message = "HH:mm 형식으로 작성해야 합니다.")
        private String endTime;

        private long calendarId;
    }

    @Getter
    @Setter
    public static class Patch {
        private long calendarContentId;

        private String imageAddress;

        private String content;

        private String location;

        @Pattern(regexp = "^([1-9]|[01][0-9]|2[0-3]):([0-5][0-9])$",
                message = "HH:mm 형식으로 작성해야 합니다.")
        private String beginTime;

        @Pattern(regexp = "^([1-9]|[01][0-9]|2[0-3]):([0-5][0-9])$",
                message = "HH:mm 형식으로 작성해야 합니다.")
        private String endTime;
    }

    @Setter
    @Getter
    public static class Response {
        private long calendarContentId;

        private String date;

        private String imageAddress;

        private String content;

        private String location;

        private String beginTime;

        private String endTime;

        private long calendarId;
    }
}
