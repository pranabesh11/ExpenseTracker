package com.billbot.billbot.repository.auth;
import com.billbot.billbot.DTO.auth.*;

public interface AuthService {
    SignUpResponse signup(SignUp signUp);
    void verifyOtp(VerifyOtpRequest verifyOtpRequest);
    void resendOtp(String email);
    LoginResponse login(LoginRequest loginRequest);
    RefreshTokenResponse refreshToken(RefreshTokenRequest refreshTokenRequest);
}
