package com.codestates.calendar.entity;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.time.LocalDate;
import java.time.LocalTime;

@Entity
@Table(name = "Calendar_Contents")
@Getter
@Setter
public class CalendarContent {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long calendarContentId;

    @Column(nullable = false)
    private LocalDate date;

    @Column(nullable = false)
    private String imageAddress;

    @Column
    private String content;

    @Column
    private String location;

    @Column(nullable = false)
    private LocalTime beginTime;

    @Column(nullable = false)
    private LocalTime endTime;

    @ManyToOne
    @JoinColumn(name = "Calendar_id")
    private Calendar calendar;
}
