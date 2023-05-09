package com.codestates.comment.entity;


import com.codestates.audit.Auditable;
import com.codestates.board.entity.Board;
import com.codestates.member.entity.Member;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;


@NoArgsConstructor
@Getter
@Setter
@Entity
public class Comment extends Auditable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long commentId;

    @Column
    private String commentContent;

    @ManyToOne
    @JoinColumn(name = "Board_id")
    private Board board;

    @ManyToOne
    @JoinColumn(name = "member_id")
    private Member member;


}
