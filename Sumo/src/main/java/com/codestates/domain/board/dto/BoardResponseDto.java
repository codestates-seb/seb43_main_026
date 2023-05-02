package com.codestates.domain.board.dto;


import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;


@Builder
@Getter
public class BoardResponseDto {

    private long boardId;
    @Setter(AccessLevel.NONE)
    private long memberId;
    private String title;
    private String content;
    private LocalDateTime createdAt;
    private LocalDateTime modifiedAt;

    public void setMember(Member member) {this.memberId = memger.getMemberId();}

}
