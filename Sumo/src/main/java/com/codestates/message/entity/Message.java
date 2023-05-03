package com.codestates.message.entity;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Getter
@Setter
public class Message {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long messageId;

    @Column(nullable = false)
    private String content;

    @Column(nullable = false, name = "created_At")
    private LocalDateTime createdAt = LocalDateTime.now();

//    @ManyToOne
//    @JoinColumn(name = "Sender_Member_id")
//    private Member sendingMember;

//    @ManyToOne
//    @JoinColumn(name = "Receiver_Member_id")
//    private Member receivingMember;
}
