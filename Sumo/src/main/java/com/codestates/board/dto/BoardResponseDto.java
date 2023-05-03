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

    @Setter(AccessLevel.NONE)
    private long memberId;

    private String title;

    private String content;

    private LocalDateTime createAt;

    public void setMember(Member member) {this.memberId = member.getMemberId(); }


}
