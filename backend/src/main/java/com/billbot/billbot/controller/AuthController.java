package com.billbot.billbot.controller;

import com.billbot.billbot.DTO.ApiResponse;
import com.billbot.billbot.DTO.auth.*;
import com.billbot.billbot.repository.auth.AuthService;
import com.billbot.billbot.repository.auth.GoogleAuthService;
import com.billbot.billbot.service.ThirdPartyServices.OtpService;
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
    private final GoogleAuthService googleAuthService;
    @PostMapping("/signup")
    public ResponseEntity<ApiResponse<SignUpResponse>> createUser(@Valid @RequestBody SignUp signUp) {
        SignUpResponse signupResponse = authService.signup(signUp);
        ApiResponse<SignUpResponse> apiResponse = new ApiResponse<>(true, "User successfully created!", signupResponse);
        return ResponseEntity.status(HttpStatus.CREATED).body(apiResponse);
    }
    @PostMapping("/verify-otp")
    public ResponseEntity<ApiResponse<Boolean>> verifyOtp(@Valid @RequestBody VerifyOtpRequest verifyOtpRequest){
        authService.verifyOtp(verifyOtpRequest);
        return ResponseEntity.ok(new ApiResponse<>(true,"Otp verified",true));
    }
    @PostMapping("/resend-otp")
    public ResponseEntity<ApiResponse<Boolean>> resendOtp(String email){
        authService.resendOtp(email);
        return ResponseEntity.ok(new ApiResponse<>(true, "Opt Send",true));
    }
    @PostMapping("/login")
    public ResponseEntity<ApiResponse<LoginResponse>> login(@Valid @RequestBody LoginRequest loginRequest){
        LoginResponse loginResponse = authService.login(loginRequest);
        return ResponseEntity.ok(new ApiResponse<>(true, "Login Successful",loginResponse));
    }
    @PostMapping("/refreshToken")
    public ResponseEntity<RefreshTokenResponse> refreshToken(@Valid @RequestBody RefreshTokenRequest refreshTokenRequest){
        return ResponseEntity.ok(authService.refreshToken(refreshTokenRequest));
    }
    @PostMapping("/google/signup")
    public ResponseEntity<ApiResponse<SignUpResponse>> googleSignUp(@Valid @RequestBody GoogleSignupRequest googleSignupRequest)throws Exception{
        SignUpResponse signupResponse = googleAuthService.googleSignUp(googleSignupRequest);
        ApiResponse<SignUpResponse> apiResponse = new ApiResponse<>(true, "User successfully created!", signupResponse);
        return ResponseEntity.status(HttpStatus.CREATED).body(apiResponse);
    }
    @PostMapping("/google/login")
    public ResponseEntity<ApiResponse<LoginResponse>> googleLogin(GoogleLoginRequest loginResponse) throws Exception{
        LoginResponse loginResponseGoogle = googleAuthService.googleLogin(loginResponse);
        return ResponseEntity.ok(new ApiResponse<>(true,"Login successful",loginResponseGoogle));
    }
    @PostMapping("/forgot-password")
    public boolean forgotPassword( String email){
        return authService.forgotPassword(email);
    }
    @PostMapping("/reset-password")
    public ResponseEntity<ApiResponse<Boolean>> resetPassword(@Valid @RequestBody ResetPassword resetPassword){
        return ResponseEntity.ok(new ApiResponse<>(true,"Password changed successfully",authService.resetPassword(resetPassword.getToken(), resetPassword.getPassword())));
    }
}