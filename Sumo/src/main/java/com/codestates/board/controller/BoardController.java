package com.codestates.board.controller;


import com.codestates.board.dto.BoardPatchDto;
import com.codestates.board.dto.BoardPostDto;
import com.codestates.board.dto.BoardResponseDto;
import com.codestates.board.entity.Board;
import com.codestates.board.mapper.BoardMapper;
import com.codestates.board.service.BoardService;
import com.codestates.member.dto.MemberDto;
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



    @PostMapping("/{category-id}")
    public ResponseEntity postBoard(@Valid @RequestBody BoardPostDto boardPostDto,
                                    @PathVariable("category-id") @Positive long categoryId){

        boardPostDto.setCategoryId(categoryId);
        Board board = boardService.createBoard(boardMapper.boardPostDtoToboard(boardPostDto));

        URI location = UriComponentsBuilder
                .newInstance()
                .path(BOARD_DEFAULT_URL + "/{category-id}/{board-id}")
                .buildAndExpand(categoryId, board.getBoardId())
                .toUri();

        return ResponseEntity.created(location).build();
    }

    @PatchMapping("/{category-id}/{board-id}")
    public ResponseEntity patchBoard(@Valid @RequestBody BoardPatchDto boardPatchDto,
                                     @PathVariable("board-id") @Positive long boardId,
                                     @RequestParam("memberId") Long memberId) {
        boardPatchDto.setBoardId(boardId);
        Board board = boardService.updateBoard(boardMapper.boardPatchDtoToBoard(boardPatchDto), memberId);
        BoardResponseDto boardResponseDto = boardMapper.boardToBoardResponseDto(board);

        return new ResponseEntity<>(boardResponseDto, HttpStatus.OK);

        // return ResponseEntity.ok().body(boardResponseDto); 이런식으로도 쓰이니 알아가면 좋음
    }


    @GetMapping("/{category-id}/{board-id}")
    public ResponseEntity getBoard(@PathVariable("board-id") @Positive long boardId) {
        Board board = boardService.findBoard(boardId);
        BoardResponseDto response = boardMapper.boardToBoardResponseDto(board);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }




    // todo: 하나의 카테고리의 모든 게시판 글을 가지고오는 GET 요청은 category로 옮길까 생각중입니다.
//    @GetMapping("/{category-id}")
//    public ResponseEntity <List<BoardResponseDto>> getboards(@PathVariable("category-id") @Positive long categoryId){
//        List<Board> boardList = boardService.findBoards(categoryId);
//        List<BoardResponseDto> responses = boardList.stream()
//                .map(boardMapper::boardToBoardResponseDto)
//                .collect(Collectors.toList());
//        return new ResponseEntity<>(responses, HttpStatus.OK);
//    }



//
    @DeleteMapping("/{category-id}/{board-id}")
    public ResponseEntity deleteBoard(@PathVariable("board-id")@Positive long boardId,
                                      @RequestParam("memberId") @Positive Long memberId) {
        boardService.deleteBoard(boardId, memberId);

        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
   }


}
