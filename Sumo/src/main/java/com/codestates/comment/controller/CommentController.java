package com.codestates.comment.controller;


import com.codestates.board.mapper.BoardMapper;
import com.codestates.board.service.BoardService;
import com.codestates.comment.mapper.CommentMapper;
import com.codestates.comment.service.CommentService;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

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

    //TODO:




}
