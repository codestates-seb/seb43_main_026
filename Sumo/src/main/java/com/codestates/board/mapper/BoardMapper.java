package com.codestates.board.mapper;


import com.codestates.board.dto.BoardPatchDto;
import com.codestates.board.dto.BoardPostDto;
import com.codestates.board.dto.BoardResponseDto;
import com.codestates.board.entity.Board;
import com.codestates.board.entity.BoardLikes;
import com.codestates.comment.entity.Comment;
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
        boardResponseDto.setBoardLikesCount(board.getBoardLikes().size());
        boardResponseDto.setCommentId(board.getComments().stream().map(Comment::getCommentId).collect(Collectors.toList()));
        boardResponseDto.setCommentCount(board.getComments().size());
        boardResponseDto.setCommentLikesCount(board.getCommentLikes().size());
        boardResponseDto.setViewCount(board.getViewCount());
        boardResponseDto.setShowOffCheckBox(board.getShowOffCheckBox());
        return boardResponseDto;
    }

    default BoardResponseDto boardToBoardPagingResponseDto(Board board){
        BoardResponseDto boardPagingResponseDto = new BoardResponseDto();
        boardPagingResponseDto.setBoardId(board.getBoardId());
        boardPagingResponseDto.setTitle(board.getTitle());
        boardPagingResponseDto.setWriter(board.getMember().getNickname());
        boardPagingResponseDto.setCreatedAt(board.getCreatedAt());
        boardPagingResponseDto.setModifiedAt(board.getModifiedAt());
        boardPagingResponseDto.setShowOffCheckBox(board.getShowOffCheckBox());
        return boardPagingResponseDto;
    }


}
