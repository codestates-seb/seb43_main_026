package com.codestates.comment.service;



import com.codestates.board.entity.Board;
import com.codestates.board.repository.BoardRepository;
import com.codestates.comment.entity.Comment;
import com.codestates.comment.repository.CommentRepository;
import com.codestates.exception.BusinessLogicException;
import com.codestates.exception.ExceptionCode;
import com.codestates.member.entity.Member;
import com.codestates.member.repository.MemberRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;



@Service
public class CommentService {

    @Autowired
    private CommentRepository commentRepository;

    @Autowired
    private MemberRepository memberRepository;


    @Autowired
    private BoardRepository boardRepository;

    //댓글 생성
    //Todo : Security 적용시 주석해제
    @Transactional
    public Comment createComment(Comment comment){
//        Member currentMember = getCurrentMember();
//        comment.setMember(currentMember);

        return commentRepository.save(comment);
    }

    //댓글 수정
    //Todo : Security 적용시 주석해제
    @Transactional
    public Comment updateComment(Comment comment){
//        Member currentMember = getCurrentMember();

        Comment findComment = findVerifiedComment(comment.getCommentId());

//        if(!findComment.getMember().getMemberId().equals(currentMember.getMemberId())) {
//            throw new BusinessLogicException(ExceptionCode.COMMENT_ACCESS_DENIED);
//
//        }
        Optional.ofNullable(comment.getCommentContent()).ifPresent(commentContent -> findComment.setCommentContent(commentContent));

        findComment.setModifiedAt(LocalDateTime.now());
        return commentRepository.save(findComment);
    }

    //게시글 삭제
    //Todo : Security 적용시 주석 해제.
    public void deleteComment(long commentId){
//        Member currentMember = getCurrentMember();

        Comment findComment = findVerifiedComment(commentId);

//        if(!findComment.getMember().getMemberId().equals(currentMember.getMemberId())) {
//            throw new BusinessLogicException(ExceptionCode.COMMENT_ACCESS_DENIED);
//
//        }

        commentRepository.deleteById(commentId);

    }



    //댓글 찾기
    public Comment findComment(long commentId) {return findVerifiedComment(commentId);}

    //댓글 검증
    private Comment findVerifiedComment(long commentId){
        Optional<Comment> optionalComment = commentRepository.findById(commentId);
        Comment findComment =
                optionalComment.orElseThrow(() ->
                        new BusinessLogicException(ExceptionCode.COMMENT_NOT_FOUND));
        return findComment;
    }

    // TODO: 현재 로그인한 회원 정보 가지고오기. // // TODO: SECURITY 적용시 주석해제
//    public Member getCurrentMember() {
//            private Member getCurrentMember() {
//        String email = SecurityContextHolder.getContext().getAuthentication().getName();
//        return memberRepository.findByEmail(email)
//                .orElseThrow(() -> new BusinessLogicException(ExceptionCode.MEMBER_NOT_FOUND));
//
//    }

    // boardId를 통해서 comment리스트 목록 뽑아오기
    @Transactional(readOnly = true)
    public List<Comment> findCommentsByBoardId(long boardId){
        Board board = boardRepository.findById(boardId)
                .orElseThrow(() ->
                        new BusinessLogicException(ExceptionCode.BOARD_NOT_FOUND));

        return commentRepository.findByBoard(board);
    }
}
