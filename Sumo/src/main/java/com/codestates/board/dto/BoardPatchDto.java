package com.codestates.board.dto;

import lombok.Getter;
import lombok.Setter;

import javax.validation.constraints.Positive;
import java.time.LocalDateTime;

@Getter
@Setter
public class BoardPatchDto {


    @Positive(message = "boardId는 올바른 값이어야 합니다.")
    private long boardId;

    private String title;

    private String content;

    private String writer;

    private LocalDateTime modifiedAt;


}
