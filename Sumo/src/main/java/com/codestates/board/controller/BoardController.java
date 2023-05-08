package com.codestates.board.controller;


import com.codestates.board.dto.BoardPatchDto;
import com.codestates.board.dto.BoardPostDto;
import com.codestates.board.dto.BoardResponseDto;
import com.codestates.board.entity.Board;
import com.codestates.board.mapper.BoardMapper;
import com.codestates.board.service.BoardService;
import com.codestates.dto.MultiResponseDto;
import com.codestates.member.dto.MemberDto;
import org.springframework.data.domain.Page;
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


    @PostMapping("/{board-id}")
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

        // return ResponseEntity.ok().body(boardResponseDto); 이런식으로도 쓰이니 알아가면 좋음
    }


    @DeleteMapping("/{board-id}")
    public ResponseEntity deleteBoard(@PathVariable("board-id")@Positive long boardId) {
        boardService.deleteBoard(boardId);

        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    //todo: 하나의 게시글 GET 요청
    @GetMapping("/{board-id}")
    public ResponseEntity getBoard(@PathVariable("board-id") @Positive long boardId) {
        Board board = boardService.findBoard(boardId);
        BoardResponseDto response = boardMapper.boardToBoardResponseDto(board);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    //todo: 최신순으로 GET 요청
    @GetMapping
    public ResponseEntity getInOrderOfRecentBoards (@Positive @RequestParam int page,
                                                    @Positive @RequestParam int size){
        Page<Board> pageBoards = boardService.findBoards(page -1, size);
        List<Board> boards = pageBoards.getContent();

        return new ResponseEntity<>(
                new MultiResponseDto<>(boardMapper.boardToBoardResponseDto())
        )
    }

    //todo: 좋아요순으로 GET 요청
    @GetMapping
    public ResponseEntity

    //todo: 댓글순으로 GET 요청


    // todo:모든 게시판 글을 가지고오는 GET 요청
//    @GetMapping("/boards")
//    public ResponseEntity <List<BoardResponseDto>> getboards(@PathVariable("board-id") @Positive long categoryId){
//        List<Board> boardList = boardService.findBoards(categoryId);
//        List<BoardResponseDto> responses = boardList.stream()
//                .map(boardMapper::boardToBoardResponseDto)
//                .collect(Collectors.toList());
//        return new ResponseEntity<>(responses, HttpStatus.OK);
//    }






}
