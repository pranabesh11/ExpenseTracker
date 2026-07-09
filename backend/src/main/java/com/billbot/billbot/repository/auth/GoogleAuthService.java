package com.billbot.billbot.repository.auth;
import com.billbot.billbot.DTO.auth.*;

public interface GoogleAuthService {
    SignUpResponse googleSignUp(GoogleSignupRequest request) throws Exception;
    LoginResponseInternal googleLogin(GoogleLoginRequest request) throws Exception;
}
