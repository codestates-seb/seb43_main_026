package com.codestates.board.service;


import com.codestates.board.entity.Board;
import com.codestates.board.entity.BoardLikes;
import com.codestates.board.repository.BoardLikesRepository;
import com.codestates.board.repository.BoardRepository;
import com.codestates.exception.BusinessLogicException;
import com.codestates.exception.ExceptionCode;
import com.codestates.member.entity.Member;
import com.codestates.member.repository.MemberRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
public class BoardService {

    @Autowired
    private BoardRepository boardRepository;

    @Autowired
    private BoardLikesRepository boardLikesRepository;

    @Autowired
    private MemberRepository memberRepository;

    // 게시글 생성
    // TODO: spring security context holder 적용
    @Transactional
    public Board createBoard(Board board){
        Member currentMember = getCurrentMember();
        board.setMember(currentMember);

        return boardRepository.save(board);
    }


    // 게시글 수정
    // TODO: spring security context holder 적용
    @Transactional
    public Board updateBoard(Board board){

        Board findBoard = findVerifiedBoard(board.getBoardId());

//        Member currentMember = getCurrentMember();
//        Board findBoard = findVerifiedBoard(board.getBoardId());
//
//        if (!findBoard.getMember().getMemberId().equals(currentMember.getMemberId())) {
//            throw new BusinessLogicException(ExceptionCode.BOARD_ACCESS_DENIED);
//        }


        Optional.ofNullable(board.getTitle()).ifPresent(title -> findBoard.setTitle(title));
        Optional.ofNullable(board.getContent()).ifPresent(content -> findBoard.setContent(content));
        return boardRepository.save(findBoard);
    }

    // 게시글 삭제
    // TODO: spring security context holder 적용
    public void deleteBoard(long boardId){
        Member currentMember = getCurrentMember();
        Board board = findVerifiedBoard(boardId);

        if (!board.getMember().getMemberId().equals(currentMember.getMemberId())) {
            throw new BusinessLogicException(ExceptionCode.BOARD_ACCESS_DENIED);
        }

        boardRepository.deleteById(boardId);
    }

    // 게시글 조회
    public Board findBoard(long boardId){
        return findVerifiedBoard(boardId);
    }

    // 게시글 목록 조회
    public Page<Board> findBoards(int page, int size){
        return boardRepository.findAll(PageRequest.of(page, size,
                Sort.by("createdAt").descending()));
    }

    // 게시글 확인
    private Board findVerifiedBoard(long boardId){
        Optional<Board> optionalBoard = boardRepository.findById(boardId);
        Board findBoard =
                optionalBoard.orElseThrow(() ->
                        new BusinessLogicException(ExceptionCode.BOARD_NOT_FOUND));
        return findBoard;
    }

    // TODO: 좋아요 수 증가.
    @Transactional
    public void increaseLike(long boardId, long memberId){
        Board board = findVerifiedBoard(boardId);
        Member member = memberRepository.findById(memberId)
                .orElseThrow(() -> new BusinessLogicException(ExceptionCode.MEMBER_NOT_FOUND));

        Optional<BoardLikes> existingBoardLikeOpt = boardLikesRepository.findByBoardAndMember(board, member);
        if (existingBoardLikeOpt.isPresent()) {
            throw new BusinessLogicException(ExceptionCode.ALREADY_LIKED);
        }

        BoardLikes newBoardLike = new BoardLikes();
        newBoardLike.setBoard(board);
        newBoardLike.setMember(member);
        boardLikesRepository.save(newBoardLike);

    }

    // TODO: 좋아요 수 감소
    @Transactional
    public void decreaseLike(long boardId, long memberId){
        Board board = findVerifiedBoard(boardId);
        Member member = memberRepository.findById(memberId)
                .orElseThrow(() -> new BusinessLogicException(ExceptionCode.MEMBER_NOT_FOUND));

        Optional<BoardLikes> existingBoardLikeOpt = boardLikesRepository.findByBoardAndMember(board, member);
        if (!existingBoardLikeOpt.isPresent()) {
            throw new BusinessLogicException(ExceptionCode.NOT_LIKED_YET);
        }


        boardLikesRepository.delete(existingBoardLikeOpt.get());
    }


    // TODO: 게시글 좋아요가 많은 순으로 정렬
    public List<Board> findBoardsSortedByLikes(){
        return boardRepository.findAll(Sort.by(Sort.Direction.DESC, "likes"));

    }

    // TODO: 게시글을 최신순으로 정렬
    public List<Board> findBoardsSortedByLatest(){
        return boardLikesRepository.findAll(Sort.by(Sort.Direction.DESC, "createdAt"));
    }

    // TODO: 게시글을 오래된 순으로 정렬
    public List<Board> findBoardsSortedByOldest(){
        return boardLikesRepository.findAll(Sort.by(Sort.Direction.ASC, "createdAt"));
    }

    // TODO: 댓글 수가 많은 순으로 정렬
    public List<Board> findBoardsSortedByComments(){
        return boardRepository.findAllByOrderByCommentsDesc();
    }

    // TODO: 현재 로그인한 회원 정보 가지고오기.
    private Member getCurrentMember() {
        String nickname = SecurityContextHolder.getContext().getAuthentication().getName();
        return memberRepository.findByNickname(nickname)
                .orElseThrow(() -> new BusinessLogicException(ExceptionCode.MEMBER_NOT_FOUND));
    }


}
