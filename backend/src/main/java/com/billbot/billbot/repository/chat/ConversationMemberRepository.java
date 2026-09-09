package com.billbot.billbot.repository.chat;

import com.billbot.billbot.entity.chat.ConversationMember;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface ConversationMemberRepository
        extends JpaRepository<ConversationMember, Long> {

    List<ConversationMember> findByConversationId(Long conversationId);

    Optional<ConversationMember> findByConversationIdAndUserId(
            Long conversationId,
            Long userId
    );

    boolean existsByConversationIdAndUserId(
            Long conversationId,
            Long userId
    );

    List<ConversationMember> findByUserId(Long userId);
    @Query("""
    SELECT cm.conversation.id
    FROM ConversationMember cm
    WHERE cm.user.id IN :userIds
    GROUP BY cm.conversation.id
    HAVING COUNT(cm.user.id) = 2
       AND COUNT(CASE WHEN cm.user.id IN :userIds THEN 1 END) = 2
""")
    List<Long> findPrivateConversationIds(@Param("userIds") List<Long> userIds);

}