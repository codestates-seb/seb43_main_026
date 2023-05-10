package com.codestates.calendar.dto;

import lombok.Getter;
import lombok.Setter;

public class CalendarDto {

    @Getter
    @Setter
    public static class Response {
        private String nickname;

        private int totalMinutes;

        private int attendanceRate;
    }
}
