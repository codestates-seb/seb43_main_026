package com.codestates.member.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class MemberResponseDtoWithBoard {
    private long boardId;
    private String title;
    private String boardImageAddress;
    private int commentsCount;
    private int likesCount;
}
