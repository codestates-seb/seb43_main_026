package com.codestates.member.entity;


import com.codestates.calendar.entity.Calendar;
import com.codestates.board.entity.Board;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import javax.persistence.*;
import javax.validation.constraints.Email;
import javax.validation.constraints.Pattern;
import java.util.ArrayList;
import java.util.List;

@NoArgsConstructor
@Getter
@Setter
@Entity
public class Member {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long memberId;

    @Column(nullable = false, unique = true)
    private String email;

    @Column(length = 100, nullable = false)
    private String password;

    @Column(nullable = false, unique = true)
    private String nickname;

    @OneToOne(mappedBy = "member",cascade = CascadeType.ALL)
    private Calendar calendar;

    @OneToMany(mappedBy = "member")
    private List<Board> boards = new ArrayList<>();

    @ElementCollection(fetch = FetchType.EAGER)
    private List<String> roles = new ArrayList<>();

    public void addBoard(Board board){
        boards.add(board);
    }
}
