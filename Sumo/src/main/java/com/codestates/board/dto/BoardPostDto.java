package com.codestates.board.dto;


import lombok.Getter;
import lombok.Setter;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Positive;
import java.time.LocalDateTime;

@Setter
@Getter
public class BoardPostDto {

    @Positive(message = "boardId는 올바른 값이어야 합니다.")
    private long boardId;

    @NotBlank(message = "제목은 필수로 입력해야 합니다.")
    private String title;

    private String content;

    private String writer;

    private LocalDateTime createAt;



}
