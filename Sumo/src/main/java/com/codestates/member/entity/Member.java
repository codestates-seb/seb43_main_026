package com.codestates.member.entity;


import com.codestates.calendar.entity.Calendar;
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

    @OneToMany(mappedBy = "member", cascade = CascadeType.ALL)
    private List<Calendar> calendars = new ArrayList<>();

    @ElementCollection(fetch = FetchType.EAGER)
    private List<String> roles = new ArrayList<>();

    public void addCalendar(Calendar calendar) {
        this.calendars.add(calendar);
        calendar.setMember(this);
    }
}
