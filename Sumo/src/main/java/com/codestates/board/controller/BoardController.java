package com.codestates.board.controller;


import com.codestates.board.dto.BoardPatchDto;
import com.codestates.board.dto.BoardPostDto;
import com.codestates.board.dto.BoardResponseDto;
import com.codestates.board.entity.Board;
import com.codestates.board.mapper.BoardMapper;
import com.codestates.board.service.BoardService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.util.UriComponentsBuilder;

import javax.validation.Valid;
import javax.validation.constraints.Positive;
import java.net.URI;
import java.util.List;
import java.util.stream.Collectors;

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


    @PostMapping
    public ResponseEntity postBoard(@Valid @RequestBody BoardPostDto boardPostDto){

        Board board = boardService.createBoard(boardMapper.boardPostDtoToboard(boardPostDto));

        URI location = UriComponentsBuilder
                .newInstance()
                .path(BOARD_DEFAULT_URL + "/{board-id}")
                .buildAndExpand(board.getBoardId())
                .toUri();

        return ResponseEntity.created(location).build();
    }

    @PatchMapping("/{board-id}")
    public ResponseEntity patchBoard(@Valid @RequestBody BoardPatchDto boardPatchDto,
                                     @PathVariable("board-id") @Positive long boardId) {
        boardPatchDto.setBoardId(boardId);

        Board board = boardService.updateBoard(boardMapper.boardPatchDtoToBoard(boardPatchDto));
        BoardResponseDto boardResponseDto = boardMapper.boardToBoardResponseDto(board);

        return new ResponseEntity<>(boardResponseDto, HttpStatus.OK);

    }


    @DeleteMapping("/{board-id}")
    public ResponseEntity deleteBoard(@PathVariable("board-id")@Positive long boardId) {
        boardService.deleteBoard(boardId);

        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    // 하나의 게시글 GET 요청
    @GetMapping("/{board-id}")
    public ResponseEntity getBoard(@PathVariable("board-id") @Positive long boardId) {
        Board board = boardService.findBoard(boardId);
        BoardResponseDto response = boardMapper.boardToBoardResponseDto(board);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    // 게시글 리스트 정렬
    @GetMapping
    public ResponseEntity getBoards(@Positive @RequestParam int page,
                                    @Positive @RequestParam int size,
                                    @RequestParam(required = false) String orderBy) {
        List<Board> boards = boardService.getGeneralSortedBoards(orderBy);

        List<BoardResponseDto> responses = boards.stream()
                .map(boardMapper::boardToBoardPagingResponseDto)
                .collect(Collectors.toList());
        return new ResponseEntity<>(responses, HttpStatus.OK);
    }


    //TODO : jwt토큰으로 인증하는것이 안전할것임
    @PostMapping("/{board-id}/likes")
    public ResponseEntity addLikeToBoard(@PathVariable("board-id") @Positive long boardId,
                                        @RequestParam("member-id") @Positive long memberId){

        boardService.toggleLike(boardId, memberId);
        return new ResponseEntity<>(HttpStatus.OK);
    }

}
