package com.codestates.board.mapper;


import com.codestates.board.dto.BoardPatchDto;
import com.codestates.board.dto.BoardPostDto;
import com.codestates.board.dto.BoardResponseDto;
import com.codestates.board.entity.Board;
import com.codestates.board.entity.BoardLike;
import org.mapstruct.Mapper;

import java.util.stream.Collectors;

@Mapper(componentModel = "spring")
public interface BoardMapper {

    default Board boardPostDtoToboard(BoardPostDto boardPostDto){

        Board board = new Board();
        board.setTitle(boardPostDto.getTitle());
        board.setContent(boardPostDto.getContent());
        board.setBoardImageAddress(boardPostDto.getBoardImageAddress());
        board.setWorkoutRecordShare(boardPostDto.getWorkoutRecordShare());
        board.setCalendarShare(boardPostDto.getCalendarShare());
        return board;
    }


    default Board boardPatchDtoToBoard(BoardPatchDto boardPatchDto){

        Board board = new Board();
        board.setBoardId(boardPatchDto.getBoardId());
        board.setTitle(boardPatchDto.getTitle());
        board.setContent(boardPatchDto.getContent());
        board.setBoardImageAddress(boardPatchDto.getBoardImageAddress());
        board.setWorkoutRecordShare(boardPatchDto.getWorkoutRecordShare());
        board.setCalendarShare(boardPatchDto.getCalendarShare());
        return board;
    }

    default BoardResponseDto boardToBoardResponseDto(Board board){
        BoardResponseDto boardResponseDto = new BoardResponseDto();
        boardResponseDto.setBoardId(board.getBoardId());
        boardResponseDto.setTitle(board.getTitle());
        boardResponseDto.setContent(board.getContent());
        boardResponseDto.setWriter(board.getMember().getNickname());
        boardResponseDto.setBoardImageAddress(board.getBoardImageAddress());
        boardResponseDto.setCreatedAt(board.getCreatedAt());
        boardResponseDto.setModifiedAt(board.getModifiedAt());
        boardResponseDto.setBoardLikeId(board.getBoardLike().stream().map(BoardLike::getBoardLikeId).collect(Collectors.toList()));
        boardResponseDto.setBoardLikeCount(board.getBoardLikeCount());
        boardResponseDto.setViewCount(board.getViewCount());
        boardResponseDto.setCalendarShare(board.getCalendarShare());
        boardResponseDto.setWorkoutRecordShare(board.getWorkoutRecordShare());
        boardResponseDto.setCommentCount(board.getCommentCount());
        return boardResponseDto;
    }

    default BoardResponseDto boardToBoardPagingResponseDto(Board board){
        BoardResponseDto boardPagingResponseDto = new BoardResponseDto();
        boardPagingResponseDto.setBoardId(board.getBoardId());
        boardPagingResponseDto.setTitle(board.getTitle());
        boardPagingResponseDto.setWriter(board.getMember().getNickname());
        boardPagingResponseDto.setBoardImageAddress(board.getBoardImageAddress());
        boardPagingResponseDto.setBoardLikeCount(board.getBoardLikeCount());
        boardPagingResponseDto.setCreatedAt(board.getCreatedAt());
        return boardPagingResponseDto;
    }



}
