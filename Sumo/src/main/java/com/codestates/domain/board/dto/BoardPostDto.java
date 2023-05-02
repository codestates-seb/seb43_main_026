package com.codestates.domain.board.dto;


import com.codestates.domain.board.entity.Board;
import lombok.Getter;

import javax.validation.Valid;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Positive;


@Getter
public class BoardPostDto {

    @Positive
    private long boardId;

    @Valid
    @NotNull(message = "제목은 필수 항목입니다.")
    private String title;
    private String content;

    public Board GetBoard() {
        Board board = new Board();
        board.setBoardId(boardId);
        return board;
    }


}
