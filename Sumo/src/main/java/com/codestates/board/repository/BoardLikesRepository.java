package com.codestates.board.repository;

import com.codestates.board.entity.Board;
import com.codestates.board.entity.BoardLikes;
import com.codestates.member.entity.Member;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface BoardLikesRepository extends JpaRepository {

    Optional <BoardLikes> findByBoard_BoardId(long boardId);
    Optional <BoardLikes> findByBoardAndMember(Board board, Member member);

}
