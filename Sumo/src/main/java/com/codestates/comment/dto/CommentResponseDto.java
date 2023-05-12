package com.codestates.comment.dto;


import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
public class CommentResponseDto {

    private long commentId;
    //    private List<Long> commentId;

    private String commentContent;

    private int commentCount;

    private int commentLikesCount;

    private LocalDateTime createdAt;

    private LocalDateTime modifiedAt;


}
