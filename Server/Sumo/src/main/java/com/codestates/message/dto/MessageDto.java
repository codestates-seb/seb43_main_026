//package com.codestates.message.dto;
//
//import lombok.Getter;
//import lombok.Setter;
//
//import javax.validation.constraints.NotBlank;
//import javax.validation.constraints.Positive;
//import java.time.LocalDateTime;
//
//public class MessageDto {
//    @Getter
//    @Setter
//    public static class Post {
//        @Positive
//        private long senderMemberId;
//
//        @Positive
//        private long receiverMemberId;
//
//        @NotBlank
//        private String content;
//    }
//
//    @Getter
//    @Setter
//    public static class Response {
//        private long messageId;
//
//        private String content;
//
//        private LocalDateTime createdAt;
//
//        private long senderMemberId;
//
//        private long receiverMemberId;
//    }
//}
