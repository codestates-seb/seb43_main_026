package com.codestates.comment.dto;


import lombok.Getter;
import lombok.Setter;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Positive;

@Getter
@Setter
public class CommentPatchDto {

    @Positive(message = "commentId는 올바른 값이어야 합니다.")
    private long commentId;

    @NotBlank(message = "댓글 작성을 완료해주세요.")
    private String commentContent;


}
