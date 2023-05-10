package com.codestates.calendar.entity;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Table(name = "Calendar_Contents")
@Getter
@Setter
public class CalendarContent {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long calendarContentId;

    @Column(nullable = false)
    private String date;

    @Column(nullable = false)
    private String imageAddress;

    @Column
    private String content;

    @Column
    private String location;

    @Column(nullable = false)
    private String beginTime;

    @Column(nullable = false)
    private String endTime;

    @ManyToOne
    @JoinColumn(name = "Calendar_id")
    private Calendar calendar;
}
