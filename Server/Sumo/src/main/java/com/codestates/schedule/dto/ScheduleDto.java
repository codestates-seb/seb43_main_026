package com.codestates.schedule.dto;

import lombok.Getter;
import lombok.Setter;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Pattern;
import java.time.LocalDate;
import java.time.LocalTime;

public class ScheduleDto {

    @Getter
    @Setter
    public static class Post {
        @NotBlank(message = "날짜는 필수 항목입니다.")
        @Pattern(regexp = "^[\\d]{4}-(0[1-9]|1[012])-(0[1-9]|[12][0-9]|3[01])$",
                message = "YYYY-MM-DD 형식으로 작성해야 합니다.")
        private String date;

        private String memo;

        private String location;

        @NotBlank(message = "운동 시작 시간은 필수 항목입니다.")
        @Pattern(regexp = "^([01][0-9]|2[0-3]):([0-5][0-9]):00$",
                message = "HH:mm:ss 형식으로 작성해야 합니다.")
        private String startTime;

        @NotBlank(message = "운동 종료 시간은 필수 항목입니다.")
        @Pattern(regexp = "^([01][0-9]|2[0-3]):([0-5][0-9]):00$",
                message = "HH:mm:ss 형식으로 작성해야 합니다.")
        private String endTime;
    }

    @Getter
    @Setter
    public static class Patch {
        private long scheduleId;

        private String memo;

        private String location;

        @Pattern(regexp = "^([1-9]|[01][0-9]|2[0-3]):([0-5][0-9]):00$",
                message = "HH:mm:ss 형식으로 작성해야 합니다.")
        private String startTime;

        @Pattern(regexp = "^([1-9]|[01][0-9]|2[0-3]):([0-5][0-9]):00$",
                message = "HH:mm:ss 형식으로 작성해야 합니다.")
        private String endTime;
    }

    @Setter
    @Getter
    public static class Response {
        private long scheduleId;

        private LocalDate date;

        private String imageAddress;

        private String memo;

        private String location;

        private LocalTime startTime;

        private LocalTime endTime;

        private float durationTime;

        private long memberId;
    }
}
