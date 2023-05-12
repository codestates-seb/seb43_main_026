package com.codestates.board.service;


import com.codestates.auth.LoginUtils;
import com.codestates.board.entity.Board;
import com.codestates.board.entity.BoardLikes;
import com.codestates.board.repository.BoardLikesRepository;
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
    private BoardLikesRepository boardLikesRepository;

    @Autowired
    private MemberRepository memberRepository;

    // 게시글 생성
    @Transactional
    public Board createBoard(Board board){

        Member currentMember = getCurrentMember();
        board.setMember(currentMember);
        currentMember.addBoard(board);
        if(board.getShowOffCheckBox() == null){
            board.setShowOffCheckBox(false);
        }
        if(board.getAttendanceExerciseCheckBox() == null){
            board.setAttendanceExerciseCheckBox(false);
        }

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
        Optional.ofNullable(board.getShowOffCheckBox()).ifPresent(showOffCheckBox -> findBoard.setShowOffCheckBox(showOffCheckBox));
        Optional.ofNullable(board.getAttendanceExerciseCheckBox()).ifPresent(attendanceExerciseCheckBox -> findBoard.setAttendanceExerciseCheckBox(attendanceExerciseCheckBox));

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

        Optional<BoardLikes> boardLike = boardLikesRepository.findByBoardAndMember(board, member);

        if(boardLike.isPresent()) {
            if (boardLike.get().getLikeStatus() == 1){
                boardLike.get().setLikeStatus(0);
            } else {
                boardLike.get().setLikeStatus(1);
            }
            boardLikesRepository.save(boardLike.get());
        } else{
            BoardLikes newBoardLike = new BoardLikes(board, member);
            newBoardLike.setLikeStatus(1);
            boardLikesRepository.save(newBoardLike);
        }

        board.setBoardLikes(boardLikesRepository.findByBoard(board));
    }


    public List<Board> findBoardsSortedByLikes(){
        return boardRepository.findAll(Sort.by(Sort.Direction.DESC, "boardLikes"));

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
        } else if (orderBy.equalsIgnoreCase("boardLikes")){
            return findBoardsSortedByLikes();
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
            return checkBoxValue ? boardRepository.findAllByShowOffCheckBoxTrue(Sort.by(Sort.Direction.DESC, "createdAt"))
                                 : boardRepository.findAllByShowOffCheckBoxFalse(Sort.by(Sort.Direction.DESC, "createdAt"));
        }
        else if (orderBy.equalsIgnoreCase("oldest")){
            return checkBoxValue ? boardRepository.findAllByShowOffCheckBoxTrue(Sort.by(Sort.Direction.DESC, "createdAt"))
                                 : boardRepository.findAllByShowOffCheckBoxFalse(Sort.by(Sort.Direction.DESC,"createdAt"));
        }
        else if (orderBy.equalsIgnoreCase("boardLikes")){
            return checkBoxValue ? boardRepository.findAllByShowOffCheckBoxTrue(Sort.by(Sort.Direction.DESC, "boardLikes"))
                                 : boardRepository.findAllByShowOffCheckBoxFalse(Sort.by(Sort.Direction.DESC, "boardLikes"));
        }
        else if (orderBy.equalsIgnoreCase("comments")){
            return checkBoxValue ? boardRepository.findAllByShowOffCheckBoxTrue(Sort.by(Sort.Direction.DESC, "commentCount"))
                                 : boardRepository.findAllByShowOffCheckBoxFalse(Sort.by(Sort.Direction.DESC, "commentCount"));
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

    /*
    게시글 좋아요 토글방식

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

 */


}
