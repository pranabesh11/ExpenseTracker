package com.billbot.billbot.service.ThirdPartyServices;

import com.billbot.billbot.DTO.auth.EmailRequest;
import com.billbot.billbot.exception.auth.EmailException;
import com.billbot.billbot.repository.auth.EmailService;
import jakarta.mail.internet.InternetAddress;
import jakarta.mail.internet.MimeMessage;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

import java.io.File;

@Service
@RequiredArgsConstructor
@Slf4j
public class EmailServiceImpl implements EmailService {
    private final JavaMailSender mailSender;
    @Value("${EMAIL_USERNAME}")
    private String from;
    @Value("${SENDER_NAME}")
    private String senderName;
    @Async
    @Override
    public void send(EmailRequest emailRequest){
        try{
            MimeMessage message = mailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(message,true,"UTF-8");
            helper.setFrom(new InternetAddress(from,senderName));
            helper.setTo(emailRequest.getTo());
            helper.setSubject(emailRequest.getSubject());
            helper.setText(emailRequest.getBody(), emailRequest.isHtml());
            if (emailRequest.getAttachments() != null) {
                for (File file : emailRequest.getAttachments()) {
                    helper.addAttachment(file.getName(), file);
                }
            }
            mailSender.send(message);
            log.info("Email sent successfully to {}", emailRequest.getTo());
        }catch (Exception exception){
            log.error("Failed to send email", exception);
            throw new EmailException("Unable to send email", exception);
        }
    }

}
