package com.billbot.billbot.controller;

import com.billbot.billbot.DTO.chat.ChatMessage;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;

@Controller
public class ChatController {
    @MessageMapping("/chat/{chatId}")
    @SendTo("/topic/chat/{chatId}")
    public ChatMessage sendMessage(@DestinationVariable Long chatId, ChatMessage message) {
        message.setChatId(chatId);
        return message;
    }
}
