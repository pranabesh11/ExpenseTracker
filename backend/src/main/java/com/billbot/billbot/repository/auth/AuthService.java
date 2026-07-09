package com.billbot.billbot.repository.auth;
import com.billbot.billbot.DTO.auth.*;

public interface AuthService {
    SignUpResponse signup(SignUp signUp);
    void verifyOtp(VerifyOtpRequest verifyOtpRequest);
    void resendOtp(String email);
    LoginResponseInternal login(LoginRequest loginRequest);
    RefreshTokenResponse refreshToken(String refreshToken);
    boolean forgotPassword(String email);
    boolean resetPassword(String token, String password);
}
