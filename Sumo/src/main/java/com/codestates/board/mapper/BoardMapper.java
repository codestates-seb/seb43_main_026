package com.codestates.board.mapper;


import com.codestates.board.dto.BoardPatchDto;
import com.codestates.board.dto.BoardPostDto;
import com.codestates.board.dto.BoardResponseDto;
import com.codestates.board.entity.Board;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface BoardMapper {

    default Board boardPostDtoToboard(BoardPostDto boardPostDto){

        // 엔티티 객체인 board 객체를 생성합니다.
        Board board = new Board();
        // Board 객체의 id 값을 설정합니다.
        board.setBoardId(boardPostDto.getBoardId());
        board.setTitle(boardPostDto.getTitle());
        board.setContent(boardPostDto.getContent());
        board.setWriter(board.getWriter());

        return board;
    }

    default Board boardPatchDtoToBoard(BoardPatchDto boardPatchDto){
        Board board = new Board();

        board.setTitle(boardPatchDto.getTitle());
        board.setContent(boardPatchDto.getContent());
        board.setWriter(board.getWriter());

        return board;
    }

    default BoardResponseDto boardToBoardResponseDto(Board board){
        BoardResponseDto boardResponseDto = new BoardResponseDto();

        boardResponseDto.setBoardId(board.getBoardId());
        boardResponseDto.setTitle(board.getTitle());
        boardResponseDto.setContent(board.getContent());
        boardResponseDto.setWriter(board.getWriter());

        return boardResponseDto;

    }


}
