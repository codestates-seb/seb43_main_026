package com.codestates.calendar.repository;

import com.codestates.calendar.entity.Calendar;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface CalendarRepository extends JpaRepository<Calendar, Long> {
    // 지금 calendar에 memberId라는 외래키가 없어서 에러뜸
    Optional<Calendar> findByMember_MemberId(long memberId);
}
