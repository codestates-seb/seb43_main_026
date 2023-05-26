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
public class CommentLike {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long commentLikeId;

    @Enumerated(EnumType.STRING)
    private CommentLikeStatus commentLikeStatus;

    @ManyToOne
    @JoinColumn(name = "Comment_id")
    private Comment comment;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "Member_id")
    private Member member;


    public CommentLike(Comment comment, Member member) {
        this.comment = comment;
        this.member = member;
    }

    public enum CommentLikeStatus{
        DISLIKE,
        LIKE
    }

}
