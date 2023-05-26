package com.codestates.board.mapper;


import com.codestates.board.dto.BoardPatchDto;
import com.codestates.board.dto.BoardPostDto;
import com.codestates.board.dto.BoardPostResponseDto;
import com.codestates.board.dto.BoardResponseDto;
import com.codestates.board.entity.Board;
import com.codestates.board.entity.BoardLike;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.springframework.stereotype.Component;

import java.util.stream.Collectors;

@Component
@Mapper(componentModel = "spring")
public interface BoardMapper {

    @Mapping(target = "image", ignore = true)
    default Board boardPostDtoToboard(BoardPostDto boardPostDto){

        Board board = new Board();
        board.setTitle(boardPostDto.getTitle());
        board.setContent(boardPostDto.getContent());
        board.setWorkoutRecordShare(boardPostDto.getWorkoutRecordShare());
        board.setCalendarShare(boardPostDto.getCalendarShare());
        board.setTotalWorkoutTime(boardPostDto.getTotalWorkoutTime());
        board.setTodayWorkoutTime(boardPostDto.getTodayWorkoutTime());
        board.setWorkoutLocation(boardPostDto.getWorkoutLocation());
        board.setAttendanceRate(boardPostDto.getAttendanceRate());
        return board;
    }

    @Mapping(target = "image", ignore = true)
    default Board boardPatchDtoToBoard(BoardPatchDto boardPatchDto){

        Board board = new Board();
        board.setBoardId(boardPatchDto.getBoardId());
        board.setTitle(boardPatchDto.getTitle());
        board.setContent(boardPatchDto.getContent());
        board.setWorkoutRecordShare(boardPatchDto.getWorkoutRecordShare());
        board.setCalendarShare(boardPatchDto.getCalendarShare());
        board.setTotalWorkoutTime(boardPatchDto.getTotalWorkoutTime());
        board.setTodayWorkoutTime(boardPatchDto.getTodayWorkoutTime());
        board.setWorkoutLocation(boardPatchDto.getWorkoutLocation());
        board.setAttendanceRate(boardPatchDto.getAttendanceRate());
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
        boardResponseDto.setMemberId(board.getMember().getMemberId());
        boardResponseDto.setTotalWorkoutTime(board.getTotalWorkoutTime());
        boardResponseDto.setTodayWorkoutTime(board.getTodayWorkoutTime());
        boardResponseDto.setWorkoutLocation(board.getWorkoutLocation());
        boardResponseDto.setAttendanceRate(board.getAttendanceRate());

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
        boardPagingResponseDto.setMemberId(board.getMember().getMemberId());
        boardPagingResponseDto.setCommentCount(board.getCommentCount());
        return boardPagingResponseDto;
    }

    default BoardPostResponseDto boardToBoardPostResponseDto(Board board){
        BoardPostResponseDto boardPostResponseDto = new BoardPostResponseDto();
        boardPostResponseDto.setBoardId(board.getBoardId());
        boardPostResponseDto.setMemberId(board.getMember().getMemberId());
        return boardPostResponseDto;
    }


}
