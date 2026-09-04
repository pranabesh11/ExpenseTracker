package com.billbot.billbot.DTO.chat;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
public class CreateGroupConversationRequest {
    private String name;
    private List<Long> userIds;
}