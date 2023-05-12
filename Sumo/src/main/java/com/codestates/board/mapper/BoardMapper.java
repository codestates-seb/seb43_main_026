package com.codestates.board.mapper;


import com.codestates.board.dto.BoardPatchDto;
import com.codestates.board.dto.BoardPostDto;
import com.codestates.board.dto.BoardResponseDto;
import com.codestates.board.entity.Board;
import com.codestates.board.entity.BoardLikes;
import com.codestates.member.entity.Member;
import org.mapstruct.Mapper;

import java.util.stream.Collectors;

@Mapper(componentModel = "spring")
public interface BoardMapper {

    default Board boardPostDtoToboard(BoardPostDto boardPostDto){

        Board board = new Board();
        Member member= new Member();
        board.setTitle(boardPostDto.getTitle());
        board.setContent(boardPostDto.getContent());
        board.setMember(member);
        board.setBoardImageAddress(boardPostDto.getBoardImageAddress());
        board.setAttendanceExerciseCheckBox(boardPostDto.getAttendanceExerciseCheckBox());
        board.setShowOffCheckBox(boardPostDto.getShowOffCheckBox());
        return board;
    }

    default Board boardPatchDtoToBoard(BoardPatchDto boardPatchDto){

        Board board = new Board();
        board.setBoardId(boardPatchDto.getBoardId());
        board.setTitle(boardPatchDto.getTitle());
        board.setContent(boardPatchDto.getContent());
        board.setBoardImageAddress(boardPatchDto.getBoardImageAddress());
        board.setAttendanceExerciseCheckBox(boardPatchDto.getAttendanceExerciseCheckBox());
        board.setShowOffCheckBox(boardPatchDto.getShowOffCheckBox());
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
        boardResponseDto.setBoardLikesId(board.getBoardLikes().stream().map(BoardLikes::getBoardLikesId).collect(Collectors.toList()));
        boardResponseDto.setBoardLikesCount(board.getBoardLikes().size());
        boardResponseDto.setViewCount(board.getViewCount());
        boardResponseDto.setShowOffCheckBox(board.getShowOffCheckBox());
        boardResponseDto.setAttendanceExerciseCheckBox(board.getAttendanceExerciseCheckBox());
        return boardResponseDto;
    }

    default BoardResponseDto boardToBoardPagingResponseDto(Board board){
        BoardResponseDto boardPagingResponseDto = new BoardResponseDto();
        boardPagingResponseDto.setBoardId(board.getBoardId());
        boardPagingResponseDto.setTitle(board.getTitle());
        boardPagingResponseDto.setWriter(board.getMember().getNickname());
        boardPagingResponseDto.setBoardImageAddress(board.getBoardImageAddress());
        boardPagingResponseDto.setBoardLikesCount(board.getBoardLikes().size());
        boardPagingResponseDto.setCreatedAt(board.getCreatedAt());
        return boardPagingResponseDto;
    }


}
