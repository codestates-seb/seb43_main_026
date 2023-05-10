package com.codestates.board.mapper;


import com.codestates.board.dto.BoardPatchDto;
import com.codestates.board.dto.BoardPostDto;
import com.codestates.board.dto.BoardResponseDto;
import com.codestates.board.entity.Board;
import com.codestates.board.entity.BoardLikes;
import com.codestates.comment.entity.Comment;
import org.mapstruct.Mapper;

import java.util.stream.Collectors;

@Mapper(componentModel = "spring")
public interface BoardMapper {

// TODO: SECURITY 적용시 주석해제
    default Board boardPostDtoToboard(BoardPostDto boardPostDto){

        // 엔티티 객체인 board 객체를 생성합니다.
        Board board = new Board();
//        Member member= new Member();

        board.setTitle(boardPostDto.getTitle());
        board.setContent(boardPostDto.getContent());
//        board.setMember(member);
        board.setBoardImageAddress(boardPostDto.getBoardImageAddress());

        return board;
    }

    default Board boardPatchDtoToBoard(BoardPatchDto boardPatchDto){
        Board board = new Board();

        board.setBoardId(boardPatchDto.getBoardId());
        board.setTitle(boardPatchDto.getTitle());
        board.setContent(boardPatchDto.getContent());
        board.setBoardImageAddress(boardPatchDto.getBoardImageAddress());
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
        boardResponseDto.setLikesCount(board.getBoardLikes().size());
        boardResponseDto.setCommentId(board.getComments().stream().map(Comment::getCommentId).collect(Collectors.toList()));
        boardResponseDto.setViewCount(board.getViewCount());
        // 댓글 수도 가지고 와야 할 수 있음.

        return boardResponseDto;

    }

    default BoardResponseDto boardToBoardPagingResponseDto(Board board){
        BoardResponseDto boardPagingResponseDto = new BoardResponseDto();

        boardPagingResponseDto.setBoardId(board.getBoardId());
        boardPagingResponseDto.setTitle(board.getTitle());
        boardPagingResponseDto.setWriter(board.getMember().getNickname());
        boardPagingResponseDto.setCreatedAt(board.getCreatedAt());
        boardPagingResponseDto.setModifiedAt(board.getModifiedAt());

        return boardPagingResponseDto;
    }


}
