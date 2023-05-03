package com.codestates.category.controller;


import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/categorys")
@Validated
public class CategoryController {




    // todo: 모든 카테고리의 게시판 글을 가지고오는 메서드 관련된거는 category로 가야하나 물어보기

    //    @GetMapping("/{category-id}")
//    public ResponseEntity <List<BoardResponseDto>> getboards(@PathVariable("category-id") @Positive long categoryId){
//        List<Board> boardList = boardService.findBoards(categoryId);
//        List<BoardResponseDto> responses = boardList.stream()
//                .map(boardMapper::boardToBoardResponseDto)
//                .collect(Collectors.toList());
//        return new ResponseEntity<>(responses, HttpStatus.OK);
//    }

}
