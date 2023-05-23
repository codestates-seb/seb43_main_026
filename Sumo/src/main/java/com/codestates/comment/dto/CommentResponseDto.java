package com.codestates.comment.dto;


import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
public class CommentResponseDto {

    private long commentId;

    private String commentContent;

    private String writer;

    private int commentLikeCount;

    private LocalDateTime createdAt;

    private LocalDateTime modifiedAt;

    private Long memberId;


}
