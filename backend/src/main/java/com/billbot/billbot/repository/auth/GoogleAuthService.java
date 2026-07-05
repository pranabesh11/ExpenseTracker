package com.billbot.billbot.repository.auth;
import com.billbot.billbot.DTO.auth.GoogleLoginRequest;
import com.billbot.billbot.DTO.auth.GoogleSignupRequest;
import com.billbot.billbot.DTO.auth.LoginResponse;
import com.billbot.billbot.DTO.auth.SignUpResponse;

public interface GoogleAuthService {
    SignUpResponse googleSignUp(GoogleSignupRequest request) throws Exception;
    LoginResponse googleLogin(GoogleLoginRequest request) throws Exception;
}
