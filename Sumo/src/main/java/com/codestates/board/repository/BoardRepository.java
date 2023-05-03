package com.codestates.board.repository;

import com.codestates.board.entity.Board;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface BoardRepository extends JpaRepository<Board, Long> {
    Optional<Board> findByMember_MemberId(long memberId);

}
