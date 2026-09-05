package com.billbot.billbot.repository.chat;

import com.billbot.billbot.entity.chat.ConversationMember;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface ConversationMemberRepository extends JpaRepository<ConversationMember, Long> {
    List<ConversationMember> findByConversationId(Long conversationId);
    Optional<ConversationMember> findByConversationIdAndUserId(Long conversationId, Long userId);
    boolean existsByConversationIdAndUserId(Long conversationId, Long userId);
}