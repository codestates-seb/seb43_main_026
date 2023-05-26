//package com.codestates.message.service;
//
//import com.codestates.message.entity.Message;
//import com.codestates.message.repository.MessageRepository;
//import org.springframework.stereotype.Service;
//
//import java.util.List;
//
//@Service
//public class MessageService {
//    private final MessageRepository messageRepository;
//
//    public MessageService(MessageRepository messageRepository) {
//        this.messageRepository = messageRepository;
//    }
//
//    public Message createMessage(Message message) {
//        return messageRepository.save(message);
//    }
//
//    public List<Message> findMessagesWithOne(long senderMemberId, long receiverMemberId) {
//        return messageRepository.findByMember_MemberIdAndMember_MemberId(senderMemberId, receiverMemberId);
//    }
//
//    public List<Message> findMessagesWithAll(long senderMemberId) {
//        return messageRepository.findByMember_MemberId(senderMemberId);
//    }
//
//    public void deleteMessage(long messageId) {
//        messageRepository.deleteById(messageId);
//    }
//
//    public void deleteMessagesWithOne(long senderMemberId, long receiverMemberId) {
//        messageRepository.deleteByMember_MemberIdAndMember_MemberId(senderMemberId, receiverMemberId);
//    }
//
//    public void deleteMessagesWithAll(long senderMemberId) {
//        messageRepository.deleteByMember_MemberId(senderMemberId);
//    }
//}
