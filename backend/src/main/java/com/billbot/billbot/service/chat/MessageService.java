package com.billbot.billbot.service.chat;

import com.billbot.billbot.DTO.chat.ChatMessage;
import com.billbot.billbot.repository.chat.MessageRepository;
import org.springframework.stereotype.Service;

@Service
public class MessageService {
    private final MessageService messageService;
    public MessageService(MessageRepository messageRepository) {
        this.messageRepository = messageRepository;
    }

    public ChatMessage sendMessage(
            Long chatId,
            ChatMessage message) {

        Message entity = new Message();

        entity.setChatId(chatId);
        entity.setSenderId(message.getSenderId());
        entity.setContent(message.getContent());
        entity.setCreatedAt(LocalDateTime.now());

        messageRepository.save(entity);

        return message;
    }
}
