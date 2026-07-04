package com.billbot.billbot.repository.auth;
import com.billbot.billbot.DTO.auth.SignUp;
import com.billbot.billbot.DTO.auth.SignUpResponse;
import com.billbot.billbot.DTO.auth.VerifyOtpRequest;

public interface AuthService {
    SignUpResponse signup(SignUp signUp);
    void verifyOtp(VerifyOtpRequest verifyOtpRequest);
    void resendOtp(String email);
}
