package com.billbot.billbot.service.chat;

import com.billbot.billbot.DTO.chat.ChatMessage;
import com.billbot.billbot.DTO.chat.MessageResponse;
import com.billbot.billbot.entity.auth.User;
import com.billbot.billbot.entity.chat.Conversation;
import com.billbot.billbot.entity.chat.ConversationMember;
import com.billbot.billbot.entity.chat.Message;
import com.billbot.billbot.repository.auth.UserRepository;
import com.billbot.billbot.repository.chat.ConversationMemberRepository;
import com.billbot.billbot.repository.chat.ConversationRepository;
import com.billbot.billbot.repository.chat.MessageRepository;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class MessageService {

    private final MessageRepository messageRepository;
    private final ConversationRepository conversationRepository;
    private final UserRepository userRepository;
    private final ConversationMemberRepository memberRepository;
    public MessageService(
            MessageRepository messageRepository,
            ConversationRepository conversationRepository,
            UserRepository userRepository,
            ConversationMemberRepository memberRepository
    ) {
        this.messageRepository = messageRepository;
        this.conversationRepository = conversationRepository;
        this.userRepository = userRepository;
        this.memberRepository = memberRepository;
    }

    @Transactional
    public ChatMessage sendMessage(Long chatId, ChatMessage message) {
        Conversation conversation = conversationRepository.findById(chatId).orElseThrow(() -> new EntityNotFoundException("Conversation not found: " + chatId));
        User sender = userRepository.findById(message.getSenderId()).orElseThrow(() -> new EntityNotFoundException("User not found: " + message.getSenderId()));
        Message entity = new Message();
        entity.setConversation(conversation);
        entity.setSender(sender);
        entity.setContent(message.getContent());
        entity.setCreatedAt(LocalDateTime.now());
        Message savedMessage = messageRepository.save(entity);
        List<ConversationMember> members = memberRepository.findByConversationId(chatId);
        for (ConversationMember member : members) {
            if (!member.getUser().getId().equals(message.getSenderId())) {
                member.setUnreadCount(member.getUnreadCount() + 1);
                memberRepository.save(member);
            }
        }
        ChatMessage response = new ChatMessage();
        response.setSenderId(savedMessage.getSender().getId());
        response.setChatId(savedMessage.getConversation().getId());
        response.setContent(savedMessage.getContent());
        return response;
    }
    @Transactional(readOnly = true)
    public Page<MessageResponse> getMessages(
            Long conversationId,
            Pageable pageable
    ) {

        Page<Message> messages =
                messageRepository
                        .findByConversationIdOrderByCreatedAtDesc(
                                conversationId,
                                pageable
                        );

        return messages.map(message ->
                new MessageResponse(
                        message.getId(),
                        message.getConversation().getId(),
                        message.getSender().getId(),
                        message.getContent(),
                        message.getCreatedAt()
                )
        );
    }
}