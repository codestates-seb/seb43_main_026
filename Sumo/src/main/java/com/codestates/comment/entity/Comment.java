package com.codestates.comment.entity;


import com.codestates.audit.Auditable;
import com.codestates.board.entity.Board;
import com.codestates.member.entity.Member;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.util.List;


@NoArgsConstructor
@Getter
@Setter
@Entity
public class Comment extends Auditable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long commentId;

    @Column(columnDefinition = "text")
    private String commentContent;


    @Column
    private int commentLikesCount = 0;

    @ManyToOne
    @JoinColumn(name = "Board_id")
    private Board board;

    @ManyToOne
    @JoinColumn(name = "member_id")
    private Member member;

    @OneToMany(mappedBy = "comment", cascade = CascadeType.REMOVE)
    private List<CommentLikes> commentLikes;

}
