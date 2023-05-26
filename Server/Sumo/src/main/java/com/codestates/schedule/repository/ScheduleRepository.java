package com.codestates.schedule.repository;

import com.codestates.schedule.entity.Schedule;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

public interface ScheduleRepository extends JpaRepository<Schedule, Long> {
    List<Schedule> findByMember_MemberId(long memberId);

    Optional<Schedule> findByDateAndMember_MemberId(LocalDate date, long memberId);
}
