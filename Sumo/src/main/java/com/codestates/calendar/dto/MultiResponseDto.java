package com.codestates.calendar.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;

import java.util.List;

@Getter
@AllArgsConstructor
public class MultiResponseDto<T> {
    private List<T> data;
    private int attendanceRate;
    private int totalMinutes;
}
