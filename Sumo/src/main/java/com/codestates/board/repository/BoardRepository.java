package com.codestates.board.repository;

import com.codestates.board.entity.Board;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;


import java.time.LocalDateTime;
import java.util.Optional;

@Repository
public interface BoardRepository extends JpaRepository<Board, Long> {
    Optional<Board> findByMember_MemberId(long memberId);

    @Query("SELECT COUNT(b) > 0 FROM Board b WHERE b.member.memberId = :memberId AND b.calendarShare = :calendarShare AND b.createdAt BETWEEN :start AND :end")
    boolean existsByMemberIdAndCalendarShareAndCreatedAtBetween(@Param("memberId") Long memberId, @Param("calendarShare") boolean calendarShare, @Param("start") LocalDateTime start, @Param("end") LocalDateTime end);

    Page<Board> findAllByCalendarShareTrue(Pageable pageable);
    Page<Board> findAllByCalendarShareFalse(Pageable pageable);


}
