package com.codestates.board.dto;

import com.codestates.member.entity.Member;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.List;

@Getter
@Setter
public class BoardResponseDto {

    private long boardId;

    private String title;

    private String content;

    private String writer;

    private LocalDateTime createdAt;

    private LocalDateTime modifiedAt;

    private int likesCount;

    private List<Long> boardLikesId;

    private List<Long> commentId;

    // comment 부분
//    private long commentId;
//
//    private String commentContent;
//
//    private LocalDateTime createAt;
//
//    private LocalDateTime modifiedAt;


}
