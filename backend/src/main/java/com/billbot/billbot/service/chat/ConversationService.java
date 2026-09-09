package com.billbot.billbot.service.chat;

import com.billbot.billbot.DTO.chat.ConversationResponse;
import com.billbot.billbot.DTO.chat.CreateGroupConversationRequest;
import com.billbot.billbot.DTO.chat.CreatePrivateConversationRequest;
import com.billbot.billbot.entity.auth.User;
import com.billbot.billbot.entity.chat.Conversation;
import com.billbot.billbot.entity.chat.ConversationMember;
import com.billbot.billbot.repository.auth.UserRepository;
import com.billbot.billbot.repository.chat.ConversationMemberRepository;
import com.billbot.billbot.repository.chat.ConversationRepository;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Service
public class ConversationService {

    private final ConversationRepository conversationRepository;
    private final ConversationMemberRepository memberRepository;
    private final UserRepository userRepository;

    public ConversationService(ConversationRepository conversationRepository, ConversationMemberRepository memberRepository, UserRepository userRepository) {
        this.conversationRepository = conversationRepository;
        this.memberRepository = memberRepository;
        this.userRepository = userRepository;
    }

    @Transactional
    public ConversationResponse createPrivateConversation(Long currentUserId, CreatePrivateConversationRequest request) {
        User currentUser = findUser(currentUserId);
        User otherUser = findUser(request.getUserId());
        if (currentUserId.equals(request.getUserId())) {
            throw new IllegalArgumentException("You cannot create a private conversation with yourself");
        }

        Conversation conversation = new Conversation();
        conversation.setType(Conversation.ConversationType.PRIVATE);
        conversation.setCreatedAt(LocalDateTime.now());
        Conversation savedConversation = conversationRepository.save(conversation);
        addMember(savedConversation, currentUser);
        addMember(savedConversation, otherUser);
        return toResponse(savedConversation, currentUserId);
    }

    @Transactional
    public ConversationResponse createGroupConversation( Long currentUserId, CreateGroupConversationRequest request) {
        User creator = findUser(currentUserId);
        if (request.getName() == null || request.getName().isBlank()) {
            throw new IllegalArgumentException("Group name is required");
        }

        if (request.getUserIds() == null || request.getUserIds().isEmpty()) {
            throw new IllegalArgumentException("At least one group member is required");
        }

        Conversation conversation = new Conversation();
        conversation.setType(Conversation.ConversationType.GROUP);
        conversation.setName(request.getName());
        conversation.setCreatedAt(LocalDateTime.now());
        Conversation savedConversation = conversationRepository.save(conversation);

        // Add creator
        addMember(savedConversation, creator);

        // Add requested users
        for (Long userId : request.getUserIds()) {
            if (userId.equals(currentUserId)) {
                continue;
            }
            User user = findUser(userId);
            addMember(savedConversation, user);
        }
        return toResponse(savedConversation, currentUserId);
    }

    private User findUser(Long userId) {
        return userRepository.findById(userId).orElseThrow(() -> new EntityNotFoundException("User not found: " + userId));
    }

    private void addMember( Conversation conversation, User user) {
        boolean alreadyMember = memberRepository.existsByConversationIdAndUserId( conversation.getId(), user.getId());
        if (alreadyMember) {
            return;
        }
        ConversationMember member = new ConversationMember();
        member.setConversation(conversation);
        member.setUser(user);
        member.setUnreadCount(0);
        member.setJoinedAt(LocalDateTime.now());
        memberRepository.save(member);
    }

    private ConversationResponse toResponse(
            Conversation conversation,
            Long userId
    ) {

        List<ConversationMember> members =
                memberRepository.findByConversationId(
                        conversation.getId()
                );

        List<Long> memberIds = members.stream()
                .map(member -> member.getUser().getId())
                .toList();

        long unreadCount = members.stream()
                .filter(member ->
                        member.getUser().getId().equals(userId)
                )
                .mapToLong(ConversationMember::getUnreadCount)
                .findFirst()
                .orElse(0);

        return new ConversationResponse(
                conversation.getId(),
                conversation.getType(),
                conversation.getName(),
                conversation.getCreatedAt(),
                memberIds,
                unreadCount
        );
    }
    @Transactional(readOnly = true)
    public List<ConversationResponse> getUserConversations(Long userId) {

        // Make sure the user exists
        findUser(userId);

        List<ConversationMember> memberships =
                memberRepository.findByUserId(userId);

        return memberships.stream()
                .map(ConversationMember::getConversation)
                .map(conversation ->
                        toResponse(conversation, userId)
                ).toList();
    }
    @Transactional
    public void markAsRead(Long conversationId, Long userId, Long lastReadMessageId) {
        ConversationMember member = memberRepository.findByConversationIdAndUserId(conversationId,userId).orElseThrow(() ->
                                new EntityNotFoundException("User is not a member of this conversation"));
        member.setUnreadCount(0);
        member.setLastReadMessageId(lastReadMessageId);
        memberRepository.save(member);
    }
}