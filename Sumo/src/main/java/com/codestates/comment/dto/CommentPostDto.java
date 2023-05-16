package com.codestates.comment.dto;


import lombok.Getter;
import lombok.Setter;

import javax.validation.constraints.Positive;

@Getter
@Setter
public class CommentPostDto {

    @Positive(message = "boardId는 올바른 값이어야 합니다.")
    private long boardId;
    private String commentContent;

}
