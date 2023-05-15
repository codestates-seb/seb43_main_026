package com.codestates.board.service;


import com.codestates.auth.LoginUtils;
import com.codestates.board.entity.Board;
import com.codestates.board.entity.BoardLike;
import com.codestates.board.repository.BoardLikeRepository;
import com.codestates.board.repository.BoardRepository;
import com.codestates.exception.BusinessLogicException;
import com.codestates.exception.ExceptionCode;
import com.codestates.member.entity.Member;
import com.codestates.member.repository.MemberRepository;
import org.springframework.beans.factory.annotation.Autowired;
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
    private BoardLikeRepository boardLikeRepository;

    @Autowired
    private MemberRepository memberRepository;

    // 게시글 생성
    @Transactional
    public Board createBoard(Board board){

        Member currentMember = getCurrentMember();
        board.setMember(currentMember);
        currentMember.addBoard(board);

        Optional.ofNullable(board.getCalendarShare()).ifPresent(board::setCalendarShare);
        Optional.ofNullable(board.getWorkoutRecordShare()).ifPresent(board::setWorkoutRecordShare);

        return boardRepository.save(board);
    }


    // 게시글 수정
    @Transactional
    public Board updateBoard(Board board){

        Member currentMember = getCurrentMember();
        Board findBoard = findVerifiedBoard(board.getBoardId());

        if (!findBoard.getMember().getMemberId().equals(currentMember.getMemberId())) {
            throw new BusinessLogicException(ExceptionCode.BOARD_ACCESS_DENIED);
        }

        Optional.ofNullable(board.getTitle()).ifPresent(title -> findBoard.setTitle(title));
        Optional.ofNullable(board.getContent()).ifPresent(content -> findBoard.setContent(content));
        Optional.ofNullable(board.getBoardImageAddress()).ifPresent(boardImageAddress -> findBoard.setBoardImageAddress(boardImageAddress));
        Optional.ofNullable(board.getCalendarShare()).ifPresent(showOffCheckBox -> findBoard.setCalendarShare(showOffCheckBox));
        Optional.ofNullable(board.getWorkoutRecordShare()).ifPresent(attendanceExerciseCheckBox -> findBoard.setWorkoutRecordShare(attendanceExerciseCheckBox));

        findBoard.setModifiedAt(LocalDateTime.now());
        return boardRepository.save(findBoard);
    }

    // 게시글 삭제
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

        Board findBoard = findVerifiedBoard(boardId);

        findBoard.setViewCount(findBoard.getViewCount() +1);
        boardRepository.save(findBoard);

        return findBoard;
    }


    // 게시글 확인
    private Board findVerifiedBoard(long boardId){
        Optional<Board> optionalBoard = boardRepository.findById(boardId);
        Board findBoard =
                optionalBoard.orElseThrow(() ->
                        new BusinessLogicException(ExceptionCode.BOARD_NOT_FOUND));
        return findBoard;
    }


    //TOGGLELIKE
    public void toggleLike(Long memberId, Long boardId){
        Board board = findVerifiedBoard(boardId);
        Member member = memberRepository.findById(memberId)
                .orElseThrow(() -> new BusinessLogicException(ExceptionCode.MEMBER_NOT_FOUND));

        Optional<BoardLike> boardLike = boardLikeRepository.findByBoardAndMember(board, member);

        if(boardLike.isPresent()) {
            if (boardLike.get().getBoardLikeStatus() == BoardLike.BoardLikeStatus.LIKE){
                boardLike.get().setBoardLikeStatus(BoardLike.BoardLikeStatus.DISLIKE);
            } else {
                boardLike.get().setBoardLikeStatus(BoardLike.BoardLikeStatus.LIKE);
            }
            boardLikeRepository.save(boardLike.get());
        } else{
            BoardLike newBoardLike = new BoardLike(board, member);
            newBoardLike.setBoardLikeStatus(BoardLike.BoardLikeStatus.LIKE);
            boardLikeRepository.save(newBoardLike);
        }

        board.setBoardLike(boardLikeRepository.findByBoard(board));
    }


    public List<Board> findBoardsSortedByLike(){
        return boardRepository.findAll(Sort.by(Sort.Direction.DESC, "boardLike"));

    }

    public List<Board> findBoardsSortedByComments(){

        return boardRepository.findAll(Sort.by(Sort.Direction.DESC, "commentCount"));
    }

    public List<Board> findBoardsSortedByLatest(){
        return boardRepository.findAll(Sort.by(Sort.Direction.DESC, "createdAt"));
    }

    public List<Board> findBoardsSortedByOldest(){
        return boardRepository.findAll(Sort.by(Sort.Direction.ASC, "createdAt"));
    }


    public List<Board> getGeneralSortedBoards(String orderBy){
        if(orderBy == null || orderBy.equalsIgnoreCase("latest")){
            return findBoardsSortedByLatest();
        } else if (orderBy.equalsIgnoreCase("oldest")){
            return findBoardsSortedByOldest();
        } else if (orderBy.equalsIgnoreCase("boardLike")){
            return findBoardsSortedByLike();
        } else if (orderBy.equalsIgnoreCase("comments")){
            return findBoardsSortedByComments();
        } else {
            throw new BusinessLogicException(ExceptionCode.INVALID_ORDER_BY_PARAMETER);
        }
    }


    public List<Board> getBoardsWithCheckbox(boolean showOffCheckBox, String orderBy) {
        return getCheckboxSortedBoards(showOffCheckBox, orderBy);
    }

    private List<Board> getCheckboxSortedBoards(boolean checkBoxValue, String orderBy) {
        if (orderBy == null || orderBy.equalsIgnoreCase("latest")){
            return checkBoxValue ? boardRepository.findAllByCalendarShareTrue(Sort.by(Sort.Direction.DESC, "createdAt"))
                                 : boardRepository.findAllByCalendarShareFalse(Sort.by(Sort.Direction.DESC, "createdAt"));
        }
        else if (orderBy.equalsIgnoreCase("oldest")){
            return checkBoxValue ? boardRepository.findAllByCalendarShareTrue(Sort.by(Sort.Direction.DESC, "createdAt"))
                                 : boardRepository.findAllByCalendarShareFalse(Sort.by(Sort.Direction.DESC,"createdAt"));
        }
        else if (orderBy.equalsIgnoreCase("boardLike")){
            return checkBoxValue ? boardRepository.findAllByCalendarShareTrue(Sort.by(Sort.Direction.DESC, "boardLike"))
                                 : boardRepository.findAllByCalendarShareFalse(Sort.by(Sort.Direction.DESC, "boardLike"));
        }
        else if (orderBy.equalsIgnoreCase("comments")){
            return checkBoxValue ? boardRepository.findAllByCalendarShareTrue(Sort.by(Sort.Direction.DESC, "commentCount"))
                                 : boardRepository.findAllByCalendarShareFalse(Sort.by(Sort.Direction.DESC, "commentCount"));
        }
        else {
            throw new BusinessLogicException(ExceptionCode.INVALID_ORDER_BY_PARAMETER);
        }

    }

    //현재 로그인한 회원 정보 가지고오기
    private Member getCurrentMember() {
        String email = LoginUtils.checkLogin();
        return memberRepository.findByEmail(email)
                .orElseThrow(() -> new BusinessLogicException(ExceptionCode.MEMBER_NOT_FOUND));
    }



    /*
    게시글 당 좋아요 수 반환

    public int getLikesCount(long boardId){
        Board board = findVerifiedBoard(boardId);
        List<BoardLikes> boardLikes = board.getBoardLikes();
        return boardLikes.size();
    }
    */

}
