package com.codestates.board.entity;


import com.codestates.audit.Auditable;
import com.codestates.comment.entity.Comment;
import com.codestates.member.entity.Member;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;


@NoArgsConstructor
@Getter
@Setter
@Entity
public class Board extends Auditable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long boardId;

    @Column(nullable = false, length = 45)
    private String title;

    @Column(columnDefinition = "text")
    private String content;

    @Column(length = 255)
    private String boardImageAddress;

    @Column
    private int viewCount;

    @Column
    private Boolean calendarShare = false;

    @Column
    private Boolean workoutRecordShare = false;

    @Column
    private float totalWorkoutTime;

    @Column
    private float todayWorkoutTime;

    @Column
    private String workoutLocation;

    @Column
    private int attendanceRate;

    @Column
    private int commentCount = 0;


    @ManyToOne
    @JoinColumn(name = "member_id")
    private Member member;

    @OneToMany(mappedBy = "board", cascade = CascadeType.REMOVE)
    private List<BoardLike> boardLike;

    @OneToMany(mappedBy = "board", cascade = CascadeType.REMOVE)
    private List<Comment> comments = new ArrayList<>();


    public int getBoardLikeCount() {
        return (int) boardLike.stream()
                .filter(boardLike -> boardLike.getBoardLikeStatus() == BoardLike.BoardLikeStatus.LIKE)
                .count();
    }

    public void addComment(Comment comment){
        this.comments.add(comment);
        comment.setBoard(this);
        this.commentCount++;  // 댓글을 추가할 때마다 카운트 증가
    }

    public void removeComment(Comment comment){
        this.comments.remove(comment);
        this.commentCount--;  // 댓글을 삭제할 때마다 카운트 감소
    }


}
