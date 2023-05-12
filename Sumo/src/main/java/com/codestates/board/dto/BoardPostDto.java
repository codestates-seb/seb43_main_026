package com.codestates.board.dto;


import lombok.Getter;
import lombok.Setter;

import javax.validation.constraints.NotBlank;

@Getter
@Setter
public class BoardPostDto {

    @NotBlank(message = "제목은 필수로 입력해야 합니다.")
    private String title;

    private String content;

    private String boardImageAddress;

    //여기에 not null이 될 수 있는 어노테이션을 입력해보기.
    private boolean showOffCheckBox;


}
