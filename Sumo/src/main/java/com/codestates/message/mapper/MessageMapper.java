//package com.codestates.message.mapper;
//
//import com.codestates.member.entity.Member;
//import com.codestates.message.dto.MessageDto;
//import com.codestates.message.entity.Message;
//import org.mapstruct.Mapper;
//
//import java.util.List;
//import java.util.stream.Collectors;
//
//@Mapper(componentModel = "spring")
//public interface MessageMapper {
//    default Message messagePostDtoToMessage(MessageDto.Post messagePostDto) {
//        Message message = new Message();
//        Member senderMember = new Member();
//        Member receiverMember = new Member();
//        senderMember.setMemberId(messagePostDto.getSenderMemberId());
//        receiverMember.setMemberId(messagePostDto.getReceiverMemberId());
//
//        message.setContent(messagePostDto.getContent());
//        message.setSenderMember(senderMember);
//        message.setReceiverMember(receiverMember);
//
//        return message;
//    }
//
//    default MessageDto.Response messageToMessageResponseDto(Message message) {
//        MessageDto.Response messageResponseDto = new MessageDto.Response();
//
//        messageResponseDto.setMessageId(message.getMessageId());
//        messageResponseDto.setContent(message.getContent());
//        messageResponseDto.setCreatedAt(message.getCreatedAt());
//        messageResponseDto.setSenderMemberId(message.getSenderMember().getMemberId());
//        messageResponseDto.setReceiverMemberId(message.getReceiverMember().getMemberId());
//
//        return messageResponseDto;
//    }
//
//    default List<MessageDto.Response> messagesToMessageResponseDtos(List<Message> messages) {
//        return messages.stream()
//                .map(message -> messageToMessageResponseDto(message))
//                .collect(Collectors.toList());
//    }
//}
