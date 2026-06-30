package com.billbot.billbot.service.auth;

import com.billbot.billbot.DTO.auth.SignUp;
import com.billbot.billbot.DTO.auth.SignUpResponse;
import com.billbot.billbot.entity.auth.User;
import com.billbot.billbot.exception.auth.UserAlreadyExistsException;
import com.billbot.billbot.repository.auth.AuthService;
import com.billbot.billbot.repository.auth.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class AuthServiceImpl implements AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    @Override
    @Transactional
    public SignUpResponse signup(SignUp signUp){
        if(userRepository.existsByEmail(signUp.getEmail())){
            throw new UserAlreadyExistsException("Email already exists");
        }
        User user = new User();
        user.setEmail(signUp.getEmail());
        user.setName(signUp.getName());
        user.setPassword(passwordEncoder.encode(signUp.getPassword()));
        userRepository.save(user);
        SignUpResponse signUpResponse =  new SignUpResponse();
        signUpResponse.setId(user.getId());
        signUpResponse.setName(user.getName());
        signUpResponse.setEmail(user.getEmail());
        return signUpResponse;
    }
}
