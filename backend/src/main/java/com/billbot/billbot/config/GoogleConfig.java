package com.billbot.billbot.config;

import lombok.Getter;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;

@Configuration
@Getter
public class GoogleConfig {
    @Value("${GOOGLE_CLIENT_ID}")
    private String clientId;
}
