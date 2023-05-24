package com.codestates.board.dto;

import lombok.Getter;
import lombok.Setter;
import org.springframework.web.multipart.MultipartFile;



@Getter
@Setter
public class BoardPatchDto {
    private long boardId;

    private String title;

    private String content;

    private long memberId;

    private MultipartFile image;

    private Boolean calendarShare;

    private Boolean workoutRecordShare;

    private float totalWorkoutTime;

    private float todayWorkoutTime;

    private String workoutLocation;

    private int attendanceRate;

}
