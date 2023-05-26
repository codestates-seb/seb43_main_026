package com.codestates.comment.controller;


import com.codestates.comment.dto.CommentPatchDto;
import com.codestates.comment.dto.CommentPostDto;
import com.codestates.comment.dto.CommentPostResponseDto;
import com.codestates.comment.dto.CommentResponseDto;
import com.codestates.comment.entity.Comment;
import com.codestates.comment.mapper.CommentMapper;
import com.codestates.comment.service.CommentService;
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
@RequestMapping("/boards/{board-id}")
@Validated
public class CommentController {
    private final static String COMMENT_DEFAULT_URL = "/boards/{board-id}";

    private final CommentService commentService;

    private final CommentMapper commentMapper;

    public CommentController(CommentService commentService, CommentMapper commentMapper) {
        this.commentService = commentService;
        this.commentMapper = commentMapper;
    }


    @PostMapping
    public ResponseEntity postComment(@Valid @RequestBody CommentPostDto commentPostDto,
                                      @PathVariable("board-id") @Positive Long boardId){
        Comment comment = commentService.createComment(commentMapper.commentPostDtoToComment(commentPostDto), boardId);
        CommentPostResponseDto commentResponseDto = commentMapper.commentToCommentPostResponseDto(comment);


        URI location = UriComponentsBuilder
                .newInstance()
                .path(COMMENT_DEFAULT_URL + "/{comment-id}")
                .buildAndExpand(boardId,comment.getCommentId())
                .toUri();
        return ResponseEntity.created(location).body(commentResponseDto);
    }

    @PatchMapping("/{comment-id}")
    public ResponseEntity patchComment(@Valid @RequestBody CommentPatchDto commentPatchDto,
                                       @PathVariable("comment-id") @Positive long commentId){
        commentPatchDto.setCommentId(commentId);

        Comment comment = commentService.updateComment(commentMapper.commentPatchDtoToComment(commentPatchDto));
        CommentResponseDto commentResponseDto = commentMapper.commentToCommentResponseDto(comment);

        return new ResponseEntity<>(commentResponseDto, HttpStatus.OK);
    }


    @DeleteMapping("/{comment-id}")
    public ResponseEntity delteComment(@PathVariable("comment-id") @Positive long commentId){
        commentService.deleteComment(commentId);

        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }


    //특정 게시글의 댓글 GET 요청
    @GetMapping("/comments")
    public ResponseEntity getCommentsByBoardId(@PathVariable("board-id")@Positive long boardId){
        List<Comment> comments = commentService.findCommentsByBoardId(boardId);
        List<CommentResponseDto> response = comments.stream()
                .map(commentMapper::commentToCommentResponseDto)
                .collect(Collectors.toList());

        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    //댓글 좋아요 추가
    @PostMapping("/{comment-id}/likes")
    public ResponseEntity toggleLikeToComment(@PathVariable("comment-id") @Positive long commentId,
                                           @RequestParam("member-id") @Positive long memberId){
        commentService.toggleLike(memberId, commentId);
        return new ResponseEntity<>(HttpStatus.OK);
    }


    //댓글 좋아요수 가져오기
    @GetMapping("/{comment-id}/likes")
    public ResponseEntity<Integer> checkLikesCountFromComment(@PathVariable("comment-id") @Positive long commentId) {

        int likesCount = commentService.getCommentLikeCount(commentId);
        return new ResponseEntity<>(likesCount, HttpStatus.OK);
    }
}
