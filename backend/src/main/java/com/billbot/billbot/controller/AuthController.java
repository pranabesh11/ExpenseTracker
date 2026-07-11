package com.billbot.billbot.controller;

import com.billbot.billbot.DTO.ApiResponse;
import com.billbot.billbot.DTO.auth.*;
import com.billbot.billbot.entity.auth.User;
import com.billbot.billbot.repository.auth.AuthService;
import com.billbot.billbot.repository.auth.GoogleAuthService;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.security.core.Authentication;
import com.google.common.net.HttpHeaders;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseCookie;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.Duration;

import static io.jsonwebtoken.Jwts.header;

@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
public class AuthController {
    private final AuthService authService;
    private final GoogleAuthService googleAuthService;
    @Value("${IS_HTTPS}")
    private boolean  isHttps;
    private ResponseEntity.BodyBuilder addAuthCookies(ResponseEntity.BodyBuilder builder, LoginResponseInternal loginResponse) {
        ResponseCookie accessCookie = ResponseCookie.from("accessToken", loginResponse.getAccessToken())
                .httpOnly(true).secure(isHttps).sameSite("Lax").path("/").maxAge(Duration.ofMinutes(15)).build();
        ResponseCookie refreshCookie = ResponseCookie.from("refreshToken", loginResponse.getRefreshToken())
                .httpOnly(true).secure(isHttps).sameSite("Lax").path("/").maxAge(Duration.ofDays(7)).build();
        return builder
                .header(HttpHeaders.SET_COOKIE, accessCookie.toString())
                .header(HttpHeaders.SET_COOKIE, refreshCookie.toString());
    }
    private String getRefreshTokenFromCookie(HttpServletRequest request){
        if(request.getCookies()==null){
            return null;
        }
        for(var cookie : request.getCookies()){
            if(cookie.getName().equals("refreshToken")){
                return cookie.getValue();
            }
        }
        return null;
    }
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
        LoginResponseInternal loginResponse = authService.login(loginRequest);
        return addAuthCookies(ResponseEntity.ok(),loginResponse)
                .body(new ApiResponse<>(true, "Login Successful",new LoginResponse(loginResponse.getUserDto())));
    }
    @PostMapping("/refreshToken")
    public ResponseEntity<?> refreshToken(HttpServletRequest request){
        String refreshToken = getRefreshTokenFromCookie(request);
        if(refreshToken == null){
            return ResponseEntity
                    .status(HttpStatus.UNAUTHORIZED)
                    .body(new ApiResponse<>(false,"Refresh token missing",null));
        }
        RefreshTokenResponse response = authService.refreshToken(refreshToken);
        ResponseCookie accessCookie = ResponseCookie.from("accessToken", response.getAccessToken())
                        .httpOnly(true)
                        .secure(isHttps)
                        .sameSite("Lax")
                        .path("/")
                        .maxAge(Duration.ofMinutes(15))
                        .build();
        return ResponseEntity.ok()
                .header(HttpHeaders.SET_COOKIE, accessCookie.toString())
                .body(new ApiResponse<>(true,"Token refreshed",null));
    }
    @PostMapping("/google/signup")
    public ResponseEntity<ApiResponse<SignUpResponse>> googleSignUp(@Valid @RequestBody GoogleSignupRequest googleSignupRequest)throws Exception{
        SignUpResponse signupResponse = googleAuthService.googleSignUp(googleSignupRequest);
        ApiResponse<SignUpResponse> apiResponse = new ApiResponse<>(true, "User successfully created!", signupResponse);
        return ResponseEntity.status(HttpStatus.CREATED).body(apiResponse);
    }
    @PostMapping("/google/login")
    public ResponseEntity<ApiResponse<LoginResponse>> googleLogin(GoogleLoginRequest googleLoginRequest) throws Exception{
        LoginResponseInternal loginResponseGoogle = googleAuthService.googleLogin(googleLoginRequest);
        return addAuthCookies(ResponseEntity.ok(),loginResponseGoogle)
                .body(new ApiResponse<>(true,"Login successful",new LoginResponse(loginResponseGoogle.getUserDto())));
    }
    @PostMapping("/forgot-password")
    public boolean forgotPassword( String email){
        return authService.forgotPassword(email);
    }
    @PostMapping("/reset-password")
    public ResponseEntity<ApiResponse<Boolean>> resetPassword(@Valid @RequestBody ResetPassword resetPassword){
        return ResponseEntity.ok(new ApiResponse<>(true,"Password changed successfully",authService.resetPassword(resetPassword.getToken(), resetPassword.getPassword())));
    }
    @GetMapping("/me")
    public ResponseEntity<ApiResponse<UserDto>> me(Authentication authentication){
        User user = (User) authentication.getPrincipal();
        UserDto userDto = new UserDto(
                user.getId(),
                user.getName(),
                user.getEmail(),
                user.isVerified()
        );
        System.out.println("================me====================>"+ authentication);
        return ResponseEntity.ok(new ApiResponse<>(true,"User fetched successfully",userDto));
    }
    @PostMapping("/logout")
    public ResponseEntity<?> logout(){
        ResponseCookie accessCookie = ResponseCookie.from("accessToken","")
                        .httpOnly(true)
                        .secure(isHttps)
                        .sameSite("Lax")
                        .path("/")
                        .maxAge(0)
                        .build();
        ResponseCookie refreshCookie = ResponseCookie.from("refreshToken","")
                .httpOnly(true)
                .secure(isHttps)
                .sameSite("Lax")
                .path("/")
                .maxAge(0)
                .build();
        System.out.println("================logout====================>"+ accessCookie+"   "+ refreshCookie);
        return ResponseEntity.ok()
                .header(HttpHeaders.SET_COOKIE,accessCookie.toString())
                .header(HttpHeaders.SET_COOKIE,refreshCookie.toString())
                .body(new ApiResponse<>(true,"Logged out",null));
    }
}