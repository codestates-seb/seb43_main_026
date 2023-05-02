package com.codestates.domain.board.controller;


import com.codestates.domain.board.dto.BoardPostDto;
import com.codestates.domain.board.entity.Board;
import com.codestates.domain.board.mapper.BoardMapper;
import com.codestates.domain.board.service.BoardService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@RestController
@RequestMapping("/boards")
public class BoardController {

    private final static String BOARD_DEFAULT_URL = "/boards";
    private BoardService boardService;
    private BoardMapper mapper;

    public BoardController(BoardService boardService, BoardMapper mapper) {
        this.boardService = boardService;
        this.mapper = mapper;
    }

    @PostMapping("/boards/{category-id}")
    public ResponseEntity postBoard(@Valid @RequestBody BoardPostDto BoardPostDto) {
        Board board = boardService.


    }


        return ResponseEntity.




    @GetMapping("/boards/{category-id}/{board-id}")



}
