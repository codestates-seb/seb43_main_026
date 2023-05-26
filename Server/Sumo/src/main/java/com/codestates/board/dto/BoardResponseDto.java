package com.codestates.board.dto;

import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.List;

@Getter
@Setter
public class BoardResponseDto {

    private long boardId;

    private Long memberId;

    private String title;

    private String content;

    private String writer;

    private LocalDateTime createdAt;

    private LocalDateTime modifiedAt;

    private int boardLikeCount;

    private List<Long> boardLikeId;

    private String boardImageAddress;

    private int commentCount;

    private int viewCount;

    private Boolean calendarShare;

    private Boolean workoutRecordShare;

    private float totalWorkoutTime;

    private float todayWorkoutTime;

    private String workoutLocation;

    private int attendanceRate;


}
