package com.codestates.comment.dto;


import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class CommentPostResponseDto {
    private long commentId;
    private Long memberId;
}
