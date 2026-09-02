package com.billbot.billbot.repository.chat;

import com.billbot.billbot.entity.chat.Message;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MessageRepository extends JpaRepository<Message, Long> {
}
