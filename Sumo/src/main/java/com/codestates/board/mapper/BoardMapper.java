package com.codestates.board.mapper;


import com.codestates.board.dto.BoardPatchDto;
import com.codestates.board.dto.BoardPostDto;
import com.codestates.board.dto.BoardResponseDto;
import com.codestates.board.entity.Board;
import com.codestates.member.entity.Member;
import com.codestates.board.entity.BoardLikes;
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
//        boardResponseDto.setWriter(board.getMember().getNickname());
        boardResponseDto.setBoardImageAddress(board.getBoardImageAddress());
        boardResponseDto.setCreatedAt(board.getCreatedAt());
        boardResponseDto.setModifiedAt(board.getModifiedAt());
        boardResponseDto.setBoardLikesId(board.getBoardLikes().stream().map(BoardLikes::getBoardLikesId).collect(Collectors.toList()));
        boardResponseDto.setLikesCount(board.getBoardLikes().size());

        // 댓글 ID를 설정하려면 게시글에 있는 댓글 엔티티에 접근하여 ID를 가져와야 합니다.
        // 예를 들어, Board 엔티티에 Comment 엔티티에 대한 참조가 있다면 다음과 같이 설정할 수 있습니다.
        // boardResponseDto.setCommentIds(board.getComments().stream().map(Comment::getCommentId).collect(Collectors.toList()));
        // 댓글 수도 가지고 와야 할 수 있음.


        return boardResponseDto;

    }


}
