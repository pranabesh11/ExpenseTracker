package com.billbot.billbot.controller;

import com.billbot.billbot.DTO.ApiResponse;
import com.billbot.billbot.DTO.auth.SignUp;
import com.billbot.billbot.DTO.auth.SignUpResponse;
import com.billbot.billbot.repository.auth.AuthService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
public class AuthController {
    private final AuthService authService;
    @PostMapping("/signup")
    public ResponseEntity<ApiResponse<SignUpResponse>> createUser(@Valid @RequestBody SignUp signUp) {
        SignUpResponse signupResponse = authService.signup(signUp);
        ApiResponse<SignUpResponse> apiResponse = new ApiResponse<>(true, "User successfully created!", signupResponse);
        return ResponseEntity.status(HttpStatus.CREATED).body(apiResponse);
    }
}