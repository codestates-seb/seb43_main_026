package com.codestates.board.dto;


import lombok.Getter;
import lombok.Setter;

import javax.validation.constraints.NotBlank;

@Setter
@Getter
public class BoardPostDto {

    @NotBlank(message = "제목은 필수로 입력해야 합니다.")
    private String title;

    private String content;

    private String boardImageAddress;


}
