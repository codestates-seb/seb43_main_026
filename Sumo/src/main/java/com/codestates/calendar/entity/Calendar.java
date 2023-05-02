package com.codestates.calendar.entity;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.util.List;

@Entity
@Getter
@Setter
public class Calendar {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long calendarId;

    // TODO 수정
//    @OneToOne
//    private Member member;

    @OneToMany(mappedBy = "calendar", cascade = CascadeType.REMOVE)
    private List<CalendarContent> calendarContents;
}
