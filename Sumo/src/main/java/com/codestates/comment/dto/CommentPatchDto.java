package com.codestates.comment.dto;


import lombok.Getter;
import lombok.Setter;

import javax.validation.constraints.Positive;

@Getter
@Setter
public class CommentPatchDto {

    @Positive(message = "commentId는 올바른 값이어야 합니다.")
    private long commentId;

    private String commentContent;


}
