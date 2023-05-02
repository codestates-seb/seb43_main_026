package com.codestates.domain.board.dto;

import lombok.Getter;

import javax.validation.constraints.Positive;

@Getter
public class BoardContentDto {
    @Positive
    private long boardId;
    private String title;
}
