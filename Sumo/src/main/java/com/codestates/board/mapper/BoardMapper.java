package com.codestates.board.mapper;


import com.codestates.board.dto.BoardPatchDto;
import com.codestates.board.dto.BoardPostDto;
import com.codestates.board.dto.BoardResponseDto;
import com.codestates.board.entity.Board;
import com.codestates.member.entity.Member;
import org.mapstruct.Mapper;

import java.util.List;

@Mapper(componentModel = "spring")
public interface BoardMapper {


    default Board boardPostDtoToboard(BoardPostDto boardPostDto){

        // 엔티티 객체인 board 객체를 생성합니다.
        Board board = new Board();
        Member member= new Member();

        board.setTitle(boardPostDto.getTitle());
        board.setContent(boardPostDto.getContent());
        board.setMember(member);

        return board;
    }

    default Board boardPatchDtoToBoard(BoardPatchDto boardPatchDto){
        Board board = new Board();

        board.setBoardId(boardPatchDto.getBoardId());
        board.setTitle(boardPatchDto.getTitle());
        board.setContent(boardPatchDto.getContent());

        return board;
    }

    default BoardResponseDto boardToBoardResponseDto(Board board){
        BoardResponseDto boardResponseDto = new BoardResponseDto();

        boardResponseDto.setBoardId(board.getBoardId());
        boardResponseDto.setTitle(board.getTitle());
        boardResponseDto.setContent(board.getContent());
        boardResponseDto.setWriter(board.getMember().getNickname());

        return boardResponseDto;

    }


}
