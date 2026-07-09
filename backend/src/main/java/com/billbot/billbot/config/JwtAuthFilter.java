package com.billbot.billbot.config;

import com.billbot.billbot.entity.auth.User;
import com.billbot.billbot.repository.auth.UserRepository;
import com.billbot.billbot.service.auth.JwtService;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.util.Collections;

@Component
@RequiredArgsConstructor
public class JwtAuthFilter extends OncePerRequestFilter {
    private final JwtService jwtService;
    private final UserRepository userRepository;
    private String getAccessTokenFromCookie(HttpServletRequest request){
        if(request.getCookies() == null){
            return null;
        }
        for(Cookie cookie : request.getCookies()){
            if(cookie.getName().equals("accessToken")){
                return cookie.getValue();
            }
        }
        return null;
    }
    @Override
    protected void doFilterInternal(
            HttpServletRequest request,
            HttpServletResponse response,
            FilterChain filterChain
    )throws ServletException, IOException {
        String token = getAccessTokenFromCookie(request);
        if(token == null){
            filterChain.doFilter(request,response);
            return;
        }
        try {
            String email = jwtService.extractUsername(token);
            if (email != null && SecurityContextHolder.getContext().getAuthentication() == null) {
                User user = userRepository.findByEmail(email).orElse(null);
                if (user != null && jwtService.isTokenValid(token, user)) {
                    UsernamePasswordAuthenticationToken auth = new UsernamePasswordAuthenticationToken(
                            user,
                            null,
                            Collections.emptyList()
                    );
                    SecurityContextHolder.getContext().setAuthentication(auth);
                }
            }
        }catch (Exception e){
            filterChain.doFilter(request,response);
        }
        filterChain.doFilter(request,response);
    }
}
