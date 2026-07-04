package com.billbot.billbot.service.ThirdPartyServices;

import com.billbot.billbot.DTO.auth.EmailRequest;
import com.billbot.billbot.repository.auth.EmailService;
import com.billbot.billbot.Templates.EmailTemplateProcessor;
import lombok.RequiredArgsConstructor;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;
import java.util.Random;
import java.util.concurrent.TimeUnit;

@Service
@RequiredArgsConstructor
public class OtpService {
    private final EmailService emailService;
    private final RedisTemplate<String,String> redisTemplate;
    private static final long OTP_EXPIRE = 3;
    private final EmailTemplateProcessor templateProcessor;
    public void saveOtp(String email,String otp){
        redisTemplate.opsForValue().set(email,otp,OTP_EXPIRE, TimeUnit.MINUTES);
    }
    public String getOtp(String email){
        return redisTemplate.opsForValue().get(email);
    }
    public void deleteOtp(String email){
        redisTemplate.delete(email);
    }
    public boolean verifyOtp(String email, String otp){
        String savedOtp = getOtp(email);
        if(savedOtp== null){
            return false;
        }
        if(savedOtp.equals(otp)){
            deleteOtp(email);
            return true;
        }
        return false;
    }
    public String generateOtp() {
        int otp = (int)(Math.random() * 90000) + 10000;
        return String.valueOf(otp);
    }
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
