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

import java.time.LocalDateTime;
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
    // TODO: SECURITY 적용시 주석해제
    @Transactional
    public Board createBoard(Board board){
//        Member currentMember = getCurrentMember();
//        board.setMember(currentMember);


        return boardRepository.save(board);
    }


    // 게시글 수정
    // TODO: SECURITY 적용시 주석해제
    @Transactional
    public Board updateBoard(Board board){

//        Member currentMember = getCurrentMember();
        Board findBoard = findVerifiedBoard(board.getBoardId());

//        if (!findBoard.getMember().getMemberId().equals(currentMember.getMemberId())) {
//            throw new BusinessLogicException(ExceptionCode.BOARD_ACCESS_DENIED);
//        }

        Optional.ofNullable(board.getTitle()).ifPresent(title -> findBoard.setTitle(title));
        Optional.ofNullable(board.getContent()).ifPresent(content -> findBoard.setContent(content));
        Optional.ofNullable(board.getBoardImageAddress()).ifPresent(boardImageAddress -> findBoard.setBoardImageAddress(boardImageAddress));

        findBoard.setModifiedAt(LocalDateTime.now());
        return boardRepository.save(findBoard);
    }

    // 게시글 삭제
    // TODO: SECURITY 적용시 주석해제
    public void deleteBoard(long boardId){
//        Member currentMember = getCurrentMember();
        Board board = findVerifiedBoard(boardId);

//        if (!board.getMember().getMemberId().equals(currentMember.getMemberId())) {
//            throw new BusinessLogicException(ExceptionCode.BOARD_ACCESS_DENIED);
//        }

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


    //TODO:  사용자가 이전에 좋아요를 눌렀던 상태를 체크해서 좋아요 수를 증가, 감소 로직으로 변경
    public void toggleLike(long boardId, long memberId) {
        Board board = findVerifiedBoard(boardId);
        Member member = memberRepository.findById(memberId)
                .orElseThrow(() -> new BusinessLogicException(ExceptionCode.MEMBER_NOT_FOUND));

        Optional<BoardLikes> existingBoardLikeOpt = boardLikesRepository.findByBoardAndMember(board, member);
        if (existingBoardLikeOpt.isPresent()) {
            BoardLikes existingBoardLike = existingBoardLikeOpt.get();
            boardLikesRepository.delete(existingBoardLike);
            board.setLikeCount(board.getLikeCount() -1);
        }
        else {
            board.setLikeCount(board.getLikeCount() +1);

            BoardLikes newBoardLike = new BoardLikes();
            newBoardLike.setBoard(board);
            newBoardLike.setMember(member);
            newBoardLike.setLikeStatus(1);
            boardLikesRepository.save(newBoardLike);
        }

        boardRepository.save(board);
    }


    public List<Board> findBoardsSortedByLikes(){
        return boardRepository.findAll(Sort.by(Sort.Direction.DESC, "likes"));

    }

    public List<Board> findBoardsSortedByLatest(){
        return boardRepository.findAll(Sort.by(Sort.Direction.DESC, "createdAt"));
    }

    public List<Board> findBoardsSortedByOldest(){
        return boardRepository.findAll(Sort.by(Sort.Direction.ASC, "createdAt"));
    }

    public List<Board> findBoardsSortedByComments(){
        return boardRepository.findAllByOrderByCommentsDesc();
    }

    // TODO: 현재 로그인한 회원 정보 가지고오기. // // TODO: SECURITY 적용시 주석해제

//    private Member getCurrentMember() {
//        String email = SecurityContextHolder.getContext().getAuthentication().getName();
//        return memberRepository.findByEmail(email)
//                .orElseThrow(() -> new BusinessLogicException(ExceptionCode.MEMBER_NOT_FOUND));
//    }

    public int getLikesCount(long boardId){
        Board board = findVerifiedBoard(boardId);
        List<BoardLikes> boardLikes = board.getBoardLikes();
        return boardLikes.size();
    }

    public List<Board> findBoards(String orderBy){
        if(orderBy == null || orderBy.equalsIgnoreCase("latest")){
            return findBoardsSortedByLatest();
        } else if (orderBy.equalsIgnoreCase("oldest")){
            return findBoardsSortedByOldest();
        } else if (orderBy.equalsIgnoreCase("likes")){
            return findBoardsSortedByLikes();
        } else if (orderBy.equalsIgnoreCase("comments")){
            return findBoardsSortedByComments();
        } else {
            throw new BusinessLogicException(ExceptionCode.INVALID_ORDER_BY_PARAMETER);
        }
    }

}
