package com.codestates.comment.entity;


import com.codestates.member.entity.Member;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Table(name = "Comment_Likes")
@Getter
@Setter
@NoArgsConstructor
public class CommentLikes {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long commentLikesId;

    @Column
    private int commentLikesStatus;

    @ManyToOne
    @JoinColumn(name = "Comment_id")
    private Comment comment;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "Member_id")
    private Member member;

    public CommentLikes(Comment comment, Member member) {
        this.comment = comment;
        this.member = member;
    }
}
