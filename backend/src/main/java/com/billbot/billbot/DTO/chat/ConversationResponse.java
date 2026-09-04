package com.billbot.billbot.DTO.chat;

import com.billbot.billbot.entity.chat.Conversation.ConversationType;
import lombok.AllArgsConstructor;
import lombok.Getter;

import java.time.LocalDateTime;
import java.util.List;

@Getter
@AllArgsConstructor
public class ConversationResponse {
    private Long id;
    private ConversationType type;
    private String name;
    private LocalDateTime createdAt;
    private List<Long> memberIds;
}