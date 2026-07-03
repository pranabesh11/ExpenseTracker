package com.billbot.billbot.repository.auth;

import com.billbot.billbot.DTO.auth.EmailRequest;

public interface EmailService {
    void send(EmailRequest request);
}
