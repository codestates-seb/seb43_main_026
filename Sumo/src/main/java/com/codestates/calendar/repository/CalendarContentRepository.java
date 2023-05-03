package com.codestates.calendar.repository;

import com.codestates.calendar.entity.CalendarContent;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CalendarContentRepository extends JpaRepository<CalendarContent, Long> {
    List<CalendarContent> findByCalendar_CalendarId(long calendarId);
}
