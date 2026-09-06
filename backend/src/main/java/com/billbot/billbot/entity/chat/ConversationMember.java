package com.billbot.billbot.entity.chat;

import com.billbot.billbot.entity.auth.User;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Entity
@Getter
@Setter
@Table(name = "conversation_members", uniqueConstraints = {@UniqueConstraint(columnNames = {"conversation_id", "user_id"})})
public class ConversationMember {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "conversation_id", nullable = false)
    private Conversation conversation;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @Column(nullable = false)
    private long unreadCount = 0;
    private Long lastReadMessageId;
    private LocalDateTime joinedAt;
}