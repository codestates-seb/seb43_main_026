package com.codestates.board.repository;

import com.codestates.board.entity.Board;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface BoardRepository extends JpaRepository<Board, Long> {
    Optional<Board> findByMember_MemberId(long memberId);

    List<Board> findAllByOrderByCommentsDesc();

}
