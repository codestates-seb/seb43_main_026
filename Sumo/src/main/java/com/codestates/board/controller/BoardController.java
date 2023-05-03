package com.codestates.board.controller;


import com.codestates.board.dto.BoardPostDto;
import com.codestates.board.entity.Board;
import com.codestates.board.mapper.BoardMapper;
import com.codestates.board.service.BoardService;
import com.codestates.member.dto.MemberDto;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.util.UriComponentsBuilder;

import javax.validation.Valid;
import javax.validation.constraints.Positive;
import java.net.URI;

@RestController
@RequestMapping("/boards")
@Validated
public class BoardController {
    private final static String BOARD_DEFAULT_URL = "/boards";

    private final BoardService boardService;
    private final BoardMapper boardMapper;

    public BoardController(BoardService boardService, BoardMapper boardMapper) {
        this.boardService = boardService;
        this.boardMapper = boardMapper;
    }

    @PostMapping("/{category-id}")
    public ResponseEntity postBoard(@Valid @RequestBody BoardPostDto boardPostDto,
                                    @PathVariable("category-id") @Positive long boardId){

        boardPostDto.setBoardId(boardId);
        // boardPostDtoToBoard() 메서드를 통해 board 객체 생성
        Board board = boardService.createBoard(boardMapper.boardPostDtoToboard(boardPostDto));

        URI location = UriComponentsBuilder
                .newInstance()
                .path(BOARD_DEFAULT_URL + "/{category-id}/{board-id}")
                .buildAndExpand(category.getCategoryId, boardId)
                .toUri();

        return ResponseEntity.created(location).build();

    }

//    @PatchMapping("/{category-id}/{board-id}")
//
//    @GetMapping("/{category-id}/{board-id}")
//
//    //모든 카테고리의 게시판 글을 가지고오는 메서드
//    @GetMapping("/{category-id}")
//
//    @DeleteMapping("/{category-id}/{board-id}"){
//        public ResponseEntity deleteBoard()
//    }


}
