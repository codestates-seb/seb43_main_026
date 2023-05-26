package com.codestates.board.controller;


import com.codestates.board.dto.BoardPatchDto;
import com.codestates.board.dto.BoardPostDto;
import com.codestates.board.dto.BoardPostResponseDto;
import com.codestates.board.dto.BoardResponseDto;
import com.codestates.board.entity.Board;
import com.codestates.board.mapper.BoardMapper;
import com.codestates.board.service.BoardService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.util.UriComponentsBuilder;

import javax.validation.Valid;
import javax.validation.constraints.Positive;
import java.io.IOException;
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
    public ResponseEntity postBoard(@Valid @RequestPart("board") BoardPostDto boardPostDto,
                                    @RequestPart(value = "image", required = false) MultipartFile image) throws IOException {

        Board board;
        if(image != null && !image.isEmpty()) {
            board = boardService.createBoardWithImage(boardMapper.boardPostDtoToboard(boardPostDto), image);
        } else {
            board = boardService.createBoard(boardMapper.boardPostDtoToboard(boardPostDto));
        }
        BoardPostResponseDto boardResponseDto = boardMapper.boardToBoardPostResponseDto(board);
        URI location = UriComponentsBuilder
                .newInstance()
                .path(BOARD_DEFAULT_URL + "/{board-id}")
                .buildAndExpand(board.getBoardId())
                .toUri();

        return ResponseEntity.created(location).body(boardResponseDto);
    }

    @PatchMapping("/{board-id}")
    public ResponseEntity patchBoard(@Valid @RequestPart("board") BoardPatchDto boardPatchDto,
                                     @RequestPart(value = "image", required = false) MultipartFile image,
                                     @PathVariable("board-id") @Positive long boardId) throws IOException  {

        boardPatchDto.setBoardId(boardId);

        Board board;
        if(image != null && !image.isEmpty()) {
            board = boardService.updateBoardWithImage(boardMapper.boardPatchDtoToBoard(boardPatchDto), image);

        }else {
            board = boardService.updateBoard(boardMapper.boardPatchDtoToBoard(boardPatchDto));

        }
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



    // 페이지 정렬 요청
    @GetMapping
    public ResponseEntity getBoards(@Positive @RequestParam int page,
                                    @Positive @RequestParam int size,
                                    @RequestParam(required = false) String orderBy,
                                    @RequestParam(required = false) Boolean calendarShare) {

        PageRequest pageRequest = PageRequest.of(page - 1, size);
        Page<Board> boards;

        if(calendarShare == null) {
            boards = boardService.getGeneralSortedBoards(pageRequest, orderBy);
        } else {
            boards = boardService.getBoardsWithCheckbox(calendarShare, pageRequest, orderBy);
        }

        List<BoardResponseDto> responses = boards.getContent().stream()
                .map(boardMapper::boardToBoardPagingResponseDto)
                .collect(Collectors.toList());
        return new ResponseEntity<>(responses, HttpStatus.OK);
    }


    //TODO : jwt토큰으로 인증하는것이 안전할것임

    @PostMapping("/{board-id}/likes")
    public ResponseEntity toggleLikeToBoard(@PathVariable("board-id") @Positive long boardId,
                                        @RequestParam("member-id") @Positive long memberId){

        boardService.toggleLike(memberId, boardId);

        return new ResponseEntity<>(HttpStatus.OK);
    }


    //좋아요수 가져오기
    @GetMapping("/{board-id}/likes")
    public ResponseEntity<Integer> checkLikesCountFromBoard(@PathVariable("board-id") @Positive long boardId) {

        int likesCount = boardService.getBoardLikesCount(boardId);
        return new ResponseEntity<>(likesCount, HttpStatus.OK);
    }

    //calendarShare post 가능 여부 확인 요청
    @GetMapping("/canPost/{memberId}")
    public ResponseEntity<Boolean> canCreatePost(@PathVariable Long memberId) {
        boolean canPost = boardService.canCalendarShare(memberId);
        return new ResponseEntity<>(canPost, HttpStatus.OK);
    }

    //board의 총 개수 count
    @GetMapping("/count")
    public ResponseEntity<Long> getBoardCount(){
        long boardCount = boardService.getBoardCount();
        return new ResponseEntity<>(boardCount, HttpStatus.OK);
    }

    //하나의 게시글에 좋아요 여부 확인 요청
    @GetMapping("/{boardId}/isliked")
    public ResponseEntity<Boolean> isLikedByMember(@PathVariable Long boardId){
        boolean isLiked = boardService.isLikedByMember(boardId);
        return new ResponseEntity<>(isLiked, HttpStatus.OK);
    }


}
