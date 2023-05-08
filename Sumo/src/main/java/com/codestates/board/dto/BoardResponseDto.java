package com.codestates.board.dto;

import com.codestates.member.entity.Member;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
public class BoardResponseDto {

    private long boardId;

    private String title;

    private String content;

    private String writer;

    private LocalDateTime createdAt;

    private LocalDateTime modifiedAt;

    private long boardLikesId;

//    private long commentId;
//
//    private String commentContent;
//
//    private LocalDateTime createAt;
//
//    private LocalDateTime modifiedAt;


}
