package com.billbot.billbot.service.auth;

import com.billbot.billbot.DTO.auth.*;
import com.billbot.billbot.config.GoogleConfig;
import com.billbot.billbot.entity.auth.User;
import com.billbot.billbot.repository.auth.GoogleAuthService;
import com.billbot.billbot.repository.auth.UserRepository;
import com.google.api.client.googleapis.auth.oauth2.GoogleIdToken;
import com.google.api.client.googleapis.auth.oauth2.GoogleIdTokenVerifier;
import com.google.api.client.http.javanet.NetHttpTransport;
import com.google.api.client.json.gson.GsonFactory;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import java.util.Collections;

@Service
@RequiredArgsConstructor
public class GoogleAuthServiceImpl implements GoogleAuthService {
    private final GoogleConfig googleConfig;
    private final UserRepository userRepository;
    private final JwtService jwtService;
    @Override
    public SignUpResponse googleSignUp(GoogleSignupRequest request)throws Exception{
        GoogleIdTokenVerifier verifier =
                new GoogleIdTokenVerifier.Builder(new NetHttpTransport(), GsonFactory.getDefaultInstance())
                        .setAudience(Collections.singletonList(googleConfig.getClientId()))
                        .build();
        GoogleIdToken idToken = verifier.verify(request.getIdToken());
        if(idToken==null){
            throw new Exception("Invalid Google Token");
        }
        GoogleIdToken.Payload payload = idToken.getPayload();
        String email = payload.getEmail();
        boolean emailVerified = Boolean.TRUE.equals(payload.getEmailVerified());
        if(!emailVerified){
            throw new RuntimeException("Email not verified");
        }
        if(userRepository.existsByEmail(email)){
            throw new Exception("User already exists");
        }
        User user = new User();
        user.setEmail(email);
        user.setName((String) payload.get("given_name")+" "+(String) payload.get("family_name"));
        user.setVerified(true);
        User savedUser = userRepository.save(user);
        SignUpResponse response = new SignUpResponse();
        response.setId(savedUser.getId());
        response.setName(savedUser.getName());
        response.setEmail(savedUser.getEmail());
        return response;
    }
    @Override
    public LoginResponse googleLogin(GoogleLoginRequest googleLoginRequest) throws Exception{
        GoogleIdTokenVerifier verifier =
                new GoogleIdTokenVerifier.Builder(
                        new NetHttpTransport(),
                        GsonFactory.getDefaultInstance())
                        .setAudience(Collections.singletonList(googleConfig.getClientId()))
                        .build();
        GoogleIdToken idToken = verifier.verify(googleLoginRequest.getIdToken());
        if (idToken == null) {
            throw new IllegalArgumentException("Invalid Google token");
        }
        GoogleIdToken.Payload payload = idToken.getPayload();
        String email = payload.getEmail();
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found. Please sign up first."));
        String accessToken = jwtService.generateAccessToken(user);
        String refreshToken = jwtService.createRefreshToken(user);
        LoginResponse loginResponse = new LoginResponse();
        loginResponse.setAccessToken(accessToken);
        loginResponse.setRefreshToken(refreshToken);
        UserDto userDto = new UserDto(
                user.getId(),
                user.getName(),
                user.getEmail(),
                user.isVerified()
        );
        loginResponse.setUserDto(userDto);
        return loginResponse;
    }
}
