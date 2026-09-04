package com.billbot.billbot.DTO.chat;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class CreatePrivateConversationRequest {
    private Long userId;
}