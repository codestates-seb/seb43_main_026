package com.codestates.calendar.repository;

import com.codestates.calendar.entity.CalendarContent;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CalendarContentRepository extends JpaRepository<CalendarContent, Long> {
}
