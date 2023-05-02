package com.codestates.domain.board.dto;


import lombok.Getter;

import java.time.LocalDateTime;

@Getter
public class BoardPatchDto {

    private long boardId;
    private String title;
    private String content;
    private LocalDateTime modifiedAt;

    public void setBoardId(long boardId) {this.boardId = boardId;}

}
