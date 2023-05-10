//package com.codestates.message.repository;
//
//import com.codestates.message.entity.Message;
//import org.springframework.data.jpa.repository.JpaRepository;
//
//import java.util.List;
//
//public interface MessageRepository extends JpaRepository<Message, Long> {
//    List<Message> findByMember_MemberIdAndMember_MemberId(long senderMemberId, long receiverMemberId);
//
//    List<Message> findByMember_MemberId(long senderMemberId);
//
//    void deleteByMember_MemberIdAndMember_MemberId(long senderMemberId, long receiverMemberId);
//
//    void deleteByMember_MemberId(long senderMemberId);
//}
