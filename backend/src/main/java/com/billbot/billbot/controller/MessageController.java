package com.billbot.billbot.controller;

import com.billbot.billbot.DTO.chat.MessageResponse;
import com.billbot.billbot.service.chat.MessageService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/conversations")
public class MessageController {

    private final MessageService messageService;

    public MessageController(MessageService messageService) {
        this.messageService = messageService;
    }

    @GetMapping("/{conversationId}/messages")
    public ResponseEntity<Page<MessageResponse>> getMessages(
            @PathVariable Long conversationId,
            @PageableDefault(size = 30) Pageable pageable
    ) {

        return ResponseEntity.ok(
                messageService.getMessages(
                        conversationId,
                        pageable
                )
        );
    }
}