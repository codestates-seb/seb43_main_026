package com.codestates.board.entity;


import com.codestates.member.entity.Member;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Table(name = "Board_Likes")
@Getter
@Setter
public class BoardLikes {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long boardLikesId;

    @Column
    private int boardLikes;

    @ManyToOne
    @JoinColumn(name = "Board_id")
    private Board board;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "Member_id")
    private Member member;

}
