package com.billbot.billbot.service.chat;

import com.billbot.billbot.DTO.chat.ChatMessage;
import com.billbot.billbot.entity.auth.User;
import com.billbot.billbot.entity.chat.Conversation;
import com.billbot.billbot.entity.chat.Message;
import com.billbot.billbot.repository.auth.UserRepository;
import com.billbot.billbot.repository.chat.ConversationRepository;
import com.billbot.billbot.repository.chat.MessageRepository;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;

@Service
public class MessageService {

    private final MessageRepository messageRepository;
    private final ConversationRepository conversationRepository;
    private final UserRepository userRepository;

    public MessageService(
            MessageRepository messageRepository,
            ConversationRepository conversationRepository,
            UserRepository userRepository
    ) {
        this.messageRepository = messageRepository;
        this.conversationRepository = conversationRepository;
        this.userRepository = userRepository;
    }

    @Transactional
    public ChatMessage sendMessage(Long chatId, ChatMessage message) {

        Conversation conversation = conversationRepository.findById(chatId)
                .orElseThrow(() ->
                        new EntityNotFoundException("Conversation not found: " + chatId)
                );

        User sender = userRepository.findById(message.getSenderId())
                .orElseThrow(() ->
                        new EntityNotFoundException("User not found: " + message.getSenderId())
                );

        Message entity = new Message();

        entity.setConversation(conversation);
        entity.setSender(sender);
        entity.setContent(message.getContent());
        entity.setCreatedAt(LocalDateTime.now());

        Message savedMessage = messageRepository.save(entity);

        ChatMessage response = new ChatMessage();
        response.setSenderId(savedMessage.getSender().getId());
        response.setChatId(savedMessage.getConversation().getId());
        response.setContent(savedMessage.getContent());

        return response;
    }
}