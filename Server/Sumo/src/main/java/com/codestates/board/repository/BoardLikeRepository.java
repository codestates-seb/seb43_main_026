package com.codestates.board.repository;

import com.codestates.board.entity.Board;
import com.codestates.board.entity.BoardLike;
import com.codestates.member.entity.Member;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface BoardLikeRepository extends JpaRepository<BoardLike, Long> {

    Optional<BoardLike> findByBoardAndMember(Board board, Member member);

    List<BoardLike> findByBoard(Board board);



}
