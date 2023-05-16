package com.codestates.board.dto;


import lombok.Getter;
import lombok.Setter;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

@Getter
@Setter
public class BoardPostDto {

    @NotBlank(message = "제목은 필수로 입력해야 합니다.")
    private String title;

    private String content;

    private String boardImageAddress;

    @NotNull
    private Boolean calendarShare;
    @NotNull
    private Boolean workoutRecordShare;


}
