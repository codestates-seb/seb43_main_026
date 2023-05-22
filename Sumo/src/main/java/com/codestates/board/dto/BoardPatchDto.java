package com.codestates.board.dto;

import lombok.Getter;
import lombok.Setter;
import org.springframework.web.multipart.MultipartFile;

import javax.validation.constraints.Positive;


@Getter
@Setter
public class BoardPatchDto {


    @Positive(message = "boardId는 올바른 값이어야 합니다.")
    private long boardId;

    private String title;

    private String content;

    private long memberId;

    private MultipartFile image;

    private Boolean calendarShare;

    private Boolean workoutRecordShare;
}
