package com.codestates.board.entity;


import com.codestates.member.entity.Member;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Table(name = "Board_Likes")
@Getter
@Setter
@NoArgsConstructor
public class BoardLike {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long boardLikeId;

    @Enumerated(EnumType.STRING)
    private BoardLikeStatus boardLikeStatus;

    @ManyToOne
    @JoinColumn(name = "board_id")
    private Board board;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "Member_id")
    private Member member;

    public BoardLike(Board board, Member member) {
        this.board = board;
        this.member = member;
    }

    public enum BoardLikeStatus{
        DISLIKE,
        LIKE
    }
}
