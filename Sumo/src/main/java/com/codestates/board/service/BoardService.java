package com.codestates.board.service;


import com.codestates.board.entity.Board;
import com.codestates.board.repository.BoardRepository;
import com.codestates.exception.BusinessLogicException;
import com.codestates.exception.ExceptionCode;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class BoardService {

    private final BoardRepository boardRepository;

    public BoardService(BoardRepository boardRepository) {
        this.boardRepository = boardRepository;
    }

    // 게시글임. board 게시판 아님!


    public Board createBoard(Board board){

        return boardRepository.save(board);
    }



    public Board updateBoard(Board board, Long memberId){
        //TODO: 작성한 사람이 UPDATE 할 수 있어야함. 완료.
        Board findBoard = findVerifiedBoard(board.getBoardId());

        if(!findBoard.getMember().getMemberId().equals(memberId)){
            throw new BusinessLogicException(ExceptionCode.BOARD_ACCESS_DENIED);
        }

        Optional.ofNullable(board.getTitle()).ifPresent(title -> findBoard.setTitle(title));
        Optional.ofNullable(board.getContent()).ifPresent(content -> findBoard.setContent(content));
        Optional.ofNullable(board.getMember().getNickname()).ifPresent(nickname -> findBoard.setWriter(nickname));
        return boardRepository.save(findBoard);
    }

    public void deleteBoard(long boardId, Long memberId){
        //TODO: 작성한 사람이 DELETE 할 수 있어야함. 완료.
        Board board = findVerifiedBoard(boardId);

        if(!board.getMember().getMemberId().equals(memberId)){
            throw new BusinessLogicException(ExceptionCode.BOARD_ACCESS_DENIED);
        }


        boardRepository.deleteById(boardId);
    }




    public Board findBoard(long boardId){
        return findVerifiedBoard(boardId);
    }

    private Board findVerifiedBoard(long boardId){
        Optional<Board> optionalBoard = boardRepository.findById(boardId);
        Board findBoard =
                optionalBoard.orElseThrow(() ->
                        new BusinessLogicException(ExceptionCode.BOARD_NOT_FOUND));
        return findBoard;
    }

}
