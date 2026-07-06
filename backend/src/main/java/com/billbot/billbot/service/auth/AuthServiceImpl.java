package com.billbot.billbot.service.auth;

import com.billbot.billbot.DTO.auth.*;
import com.billbot.billbot.Templates.EmailTemplateProcessor;
import com.billbot.billbot.entity.auth.RefreshToken;
import com.billbot.billbot.entity.auth.User;
import com.billbot.billbot.exception.auth.UserAlreadyExistsException;
import com.billbot.billbot.repository.auth.AuthService;
import com.billbot.billbot.repository.auth.EmailService;
import com.billbot.billbot.repository.auth.RefreshTokenRepository;
import com.billbot.billbot.repository.auth.UserRepository;
import com.billbot.billbot.service.ThirdPartyServices.OtpService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.time.Instant;
import java.util.HashMap;
import java.util.Map;
import java.util.concurrent.TimeUnit;

@Service
@RequiredArgsConstructor
public class AuthServiceImpl implements AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final OtpService otpService;
    private final AuthenticationManager authenticationManager;
    private final JwtService jwtService;
    private final RefreshTokenRepository refreshTokenRepository;
    private final EmailTemplateProcessor emailTemplateProcessor;
    private final EmailService emailService;
    private final RedisTemplate<String,String> redisTemplate;
    private static final long TOKEN_EXPIRE = 5;
    @Value("${RESET_LINK}")
    private String RESET_LINK;
    @Override
    @Transactional
    public SignUpResponse signup(SignUp signUp){
        if(userRepository.existsByEmail(signUp.getEmail())){
            throw new UserAlreadyExistsException("Email already exists");
        }
        User user = new User();
        user.setEmail(signUp.getEmail());
        user.setName(signUp.getName());
        user.setPassword(passwordEncoder.encode(signUp.getPassword()));
        user.setVerified(false);
        userRepository.save(user);
        SignUpResponse signUpResponse =  new SignUpResponse();
        signUpResponse.setId(user.getId());
        signUpResponse.setName(user.getName());
        signUpResponse.setEmail(user.getEmail());
        String otpString = String.valueOf(otpService.generateOtp());
        otpService.saveOtp(signUp.getEmail(),otpString);
        otpService.sendOtp(signUp.getEmail(),otpString);
        return signUpResponse;
    }
    public LoginResponse login(LoginRequest loginRequest){
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        loginRequest.getEmail(),
                        loginRequest.getPassword()
                )
        );
        User user = userRepository.findByEmail(loginRequest.getEmail()).orElseThrow(()->new UsernameNotFoundException("No user found !"));
        String accessToken = jwtService.generateAccessToken(user);
        String refreshToken = jwtService.createRefreshToken(user);
        return new LoginResponse(
                accessToken,
                refreshToken,
                new UserDto(
                        user.getId(),
                        user.getName(),
                        user.getEmail(),
                        user.isVerified()
                )
        );
    }

    public RefreshTokenResponse refreshToken(RefreshTokenRequest refreshTokenRequest) {
        RefreshToken refreshToken = refreshTokenRepository.findByToken(refreshTokenRequest.getRefreshToken());
        if (refreshToken == null || refreshToken.getExpiresAt().isBefore(Instant.now())) {
            if (refreshToken != null) {
                refreshTokenRepository.delete(refreshToken);
            }
            throw new RuntimeException("Refresh token expired");
        }
        User user = refreshToken.getUser();
        String accessToken = jwtService.generateAccessToken(user);
        return new RefreshTokenResponse(
                "new token",
                accessToken,
                refreshToken.getToken()
        );
    }
    public void verifyOtp(VerifyOtpRequest verifyOtpRequest){
        boolean isValid = otpService.verifyOtp(verifyOtpRequest.getEmail(),verifyOtpRequest.getOtp());
        if (!isValid) {throw new RuntimeException("Invalid or Expired OTP");}
        User user = userRepository.findByEmail(verifyOtpRequest.getEmail()).orElseThrow(() -> new RuntimeException("User not found"));
        user.setVerified(true);
        userRepository.save(user);
    }
    public void resendOtp(String email){
        otpService.sendOtp(email, otpService.generateOtp());
    }
    public boolean forgotPassword(String email){
        User user = userRepository.findByEmail(email).orElseThrow(()->new RuntimeException("Email doesn't exist !"));
        Map<String, Object> variables = new HashMap<>();
        String token = jwtService.generateAccessToken(user);
        variables.put("resetLink",RESET_LINK+token);
        String resetToken = jwtService.generateResetToken();
        redisTemplate.opsForValue().set( "reset:"+token, user.getEmail(),TOKEN_EXPIRE, TimeUnit.MINUTES);
        String body = emailTemplateProcessor.process("email/resetPassword",variables);
        EmailRequest request = new EmailRequest();
        request.setTo(email);
        request.setSubject("Reset Password Link");
        request.setBody(body);
        emailService.send(request);
        return true;
    }
    public boolean resetPassword(String token, String password){
        String email = redisTemplate.opsForValue().get( "reset:"+token);
        if(email == null){
            throw new RuntimeException("Invalid or expired reset token");
        }
        User user = userRepository.findByEmail(email).orElseThrow(()->new RuntimeException("No user found"));
        if(!jwtService.isTokenValid(token,user)){
            throw new RuntimeException("Token validation failed");
        }
        user.setPassword(passwordEncoder.encode(password));
        userRepository.save(user);
        redisTemplate.delete("reset:" + token);
        return true;
    }
}
