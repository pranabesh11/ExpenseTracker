package com.billbot.billbot.controller;

import com.billbot.billbot.DTO.chat.ChatMessage;
import com.billbot.billbot.service.chat.MessageService;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;

@Controller
public class ChatController {
    private final MessageService messageService;

    public ChatController(MessageService messageService) {
        this.messageService = messageService;
    }

    @MessageMapping("/chat/{chatId}")
    @SendTo("/topic/chat/{chatId}")
    public ChatMessage sendMessage(@DestinationVariable Long chatId, ChatMessage message) {
        return messageService.sendMessage(chatId, message);
    }
}
