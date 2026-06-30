package com.billbot.billbot.repository.auth;

import com.billbot.billbot.DTO.ApiResponse;
import com.billbot.billbot.DTO.auth.SignUp;
import com.billbot.billbot.DTO.auth.SignUpResponse;

public interface AuthService {
    SignUpResponse signup(SignUp signUp);
}
