package com.billbot.billbot.repository.chat;

import com.billbot.billbot.entity.chat.Conversation;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ConversationRepository extends JpaRepository<Conversation, Long> {
}
