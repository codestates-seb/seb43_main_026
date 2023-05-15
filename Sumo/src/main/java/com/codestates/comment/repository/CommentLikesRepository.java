package com.codestates.comment.repository;


import com.codestates.comment.entity.Comment;
import com.codestates.comment.entity.CommentLike;
import com.codestates.member.entity.Member;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface CommentLikesRepository extends JpaRepository<CommentLike, Long> {

    Optional<CommentLike> findByCommentAndMember(Comment comment, Member member);

    List<CommentLike> findByComment(Comment comment);

}
