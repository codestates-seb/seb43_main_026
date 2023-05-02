package com.codestates.domain.board.entity;


import com.codestates.audit.Auditable;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;


@NoArgsConstructor
@Setter
@Getter
@Entity
public class Board extends Auditable {

   //  카테고리, 제목, 내용
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long boardId;

    @Column(nullable = false, length = 30)
    private String title;

    @Column(nullable = false)
    private String content;

    @OneToMany(mappedBy = "board")
    private List<Comment> comments;

    public enum BoardStatus {

        BOARD_IS_EMPTY("게시판이 비었습니다");

        @Getter
        private String status;

        BoardStatus(String status) {this.status = status;}
    }

}
