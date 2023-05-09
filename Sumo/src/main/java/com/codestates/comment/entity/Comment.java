package com.codestates.comment.entity;


import com.codestates.audit.Auditable;
import com.codestates.board.entity.Board;
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
    private String comment;

    @ManyToOne
    @JoinColumn(name = "Board_id")
    private Board board;


}
