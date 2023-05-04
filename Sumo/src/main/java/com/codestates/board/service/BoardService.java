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
    // TODO: login여부 확인. 아니면 exception 던지기
    //    spring security context holder? ->

        return boardRepository.save(board);
    }



    public Board updateBoard(Board board){

        Board findBoard = findVerifiedBoard(board.getBoardId());
        // TODO: login여부 확인. 아니면 exception 던지기
        //    spring security context holder? ->
//        if(!findBoard.getMember().getMemberId().equals(memberId)){
//            throw new BusinessLogicException(ExceptionCode.BOARD_ACCESS_DENIED);
//        }

        Optional.ofNullable(board.getTitle()).ifPresent(title -> findBoard.setTitle(title));
        Optional.ofNullable(board.getContent()).ifPresent(content -> findBoard.setContent(content));
        return boardRepository.save(findBoard);
    }

    public void deleteBoard(long boardId){

        Board board = findVerifiedBoard(boardId);
        // TODO: login여부 확인. 아니면 exception 던지기
        //    spring security context holder? ->
//        if(!board.getMember().getMemberId().equals(memberId)){
//            throw new BusinessLogicException(ExceptionCode.BOARD_ACCESS_DENIED);
//        }

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
