package com.billbot.billbot.controller;

import com.billbot.billbot.DTO.chat.ConversationResponse;
import com.billbot.billbot.DTO.chat.CreateGroupConversationRequest;
import com.billbot.billbot.DTO.chat.CreatePrivateConversationRequest;
import com.billbot.billbot.service.chat.ConversationService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/conversations")
public class ConversationController {

    private final ConversationService conversationService;

    public ConversationController(ConversationService conversationService) {
        this.conversationService = conversationService;
    }

    @PostMapping("/private")
    public ResponseEntity<ConversationResponse> createPrivateConversation(@RequestParam Long currentUserId, @RequestBody CreatePrivateConversationRequest request) {
        ConversationResponse response = conversationService.createPrivateConversation(currentUserId, request);
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    @PostMapping("/group")
    public ResponseEntity<ConversationResponse> createGroupConversation(@RequestParam Long currentUserId,@RequestBody CreateGroupConversationRequest request) {
        ConversationResponse response = conversationService.createGroupConversation(currentUserId, request);
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }
    @GetMapping
    public ResponseEntity<List<ConversationResponse>> getUserConversations(
            @RequestParam Long userId
    ) {

        List<ConversationResponse> conversations =
                conversationService.getUserConversations(userId);

        return ResponseEntity.ok(conversations);
    }
    @PutMapping("/{conversationId}/read")
    public ResponseEntity<Void> markAsRead(
            @PathVariable Long conversationId,
            @RequestParam Long userId,
            @RequestParam Long lastReadMessageId
    ) {

        conversationService.markAsRead(
                conversationId,
                userId,
                lastReadMessageId
        );

        return ResponseEntity.noContent().build();
    }
}