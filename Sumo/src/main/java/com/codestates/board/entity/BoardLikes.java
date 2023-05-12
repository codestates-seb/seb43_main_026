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
public class BoardLikes {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long boardLikesId;

    //TODO: boolean, enum 도 좋을것 같다.
    @Column
    private int likeStatus;

    @ManyToOne
    @JoinColumn(name = "Board_id")
    private Board board;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "Member_id")
    private Member member;

    public BoardLikes(Board board, Member member) {
        this.board = board;
        this.member = member;
    }
}