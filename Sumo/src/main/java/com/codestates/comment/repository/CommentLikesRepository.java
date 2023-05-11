package com.codestates.comment.repository;


import com.codestates.comment.entity.Comment;
import com.codestates.comment.entity.CommentLikes;
import com.codestates.member.entity.Member;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface CommentLikesRepository extends JpaRepository<CommentLikes, Long> {

    Optional<CommentLikes> findByCommentAndMember(Comment comment, Member member);

    List<CommentLikes> findByComment(Comment comment);

}
