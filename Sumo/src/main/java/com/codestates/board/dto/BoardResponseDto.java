package com.codestates.board.dto;

import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.List;

@Getter
@Setter
public class BoardResponseDto {

    private long boardId;

    private String title;

    private String content;

    private String writer;

    private LocalDateTime createdAt;

    private LocalDateTime modifiedAt;

    private int boardLikesCount;

    private List<Long> boardLikesId;

    private String boardImageAddress;

    private int viewCount;


    private Boolean showOffCheckBox;

    private Boolean attendanceExerciseCheckBox;


}
