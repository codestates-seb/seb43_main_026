package com.codestates.board.entity;


import com.codestates.audit.Auditable;
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
public class Board extends Auditable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long boardId;

    @Column(nullable = false)
    private String title;

    @Column
    private String content;

    @ManyToOne
    @JoinColumn(name = "member_id")
    private Member member;

    @OneToMany(mappedBy = "board", cascade = CascadeType.REMOVE)
    private List<BoardLikes> boardLikes;

    @Column
    private int likeCount;

    private String boardImageAddress;

//    public int getLikesCount(){
//        return boardLikes.size();
//    }

//    @OneToMany(mappedBy = "board", cascade = CascadeType.REMOVE)
//    private List<Comment> comments;



}
