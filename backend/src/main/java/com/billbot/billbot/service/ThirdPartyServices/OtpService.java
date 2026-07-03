package com.billbot.billbot.service.ThirdPartyServices;

import com.billbot.billbot.DTO.auth.EmailRequest;
import com.billbot.billbot.repository.auth.EmailService;
import com.billbot.billbot.Templates.EmailTemplateProcessor;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class OtpService {
    private final EmailService emailService;
    private final EmailTemplateProcessor templateProcessor;
    public void sendOtp(String email, String otp) {
        Map<String, Object> variables = new HashMap<>();
        variables.put("otp", otp);
        String body = templateProcessor.process("email/otp", variables);
        EmailRequest request = new EmailRequest();
        request.setTo(email);
        request.setSubject("OTP Verification");
        request.setBody(body);
        emailService.send(request);
    }
}
