package com.billbot.billbot.service.auth;

import com.billbot.billbot.entity.auth.RefreshToken;
import com.billbot.billbot.entity.auth.User;
import com.billbot.billbot.repository.auth.RefreshTokenRepository;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import javax.crypto.SecretKey;
import java.nio.charset.StandardCharsets;
import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.Date;
import java.util.UUID;

@Service
public class JwtService {
    private final SecretKey secretKey;
    private final RefreshTokenRepository refreshTokenRepository;
    public JwtService(
            @Value("${JWT_SECRET}") String secret,
            RefreshTokenRepository refreshTokenRepository
    ) {
        this.secretKey = Keys.hmacShaKeyFor(
                secret.getBytes(StandardCharsets.UTF_8)
        );
        this.refreshTokenRepository = refreshTokenRepository;
    }
    public String generateAccessToken(User user){
        return Jwts.builder()
                .setSubject(user.getEmail())
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis()+ 15 * 60 * 1000))
                .signWith(secretKey)
                .compact();
    }
    public String generateRefreshToken(User user){
        return Jwts.builder()
                .setSubject(user.getEmail())
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() + 7L * 24 * 60 * 60 * 1000))
                .signWith(secretKey)
                .compact();
    }
    public String extractUsername(String token){
        return extractAllClaims(token).getSubject();
    }
    private Claims extractAllClaims(String token) {
        return Jwts.parser()
                .setSigningKey(secretKey)
                .parseClaimsJws(token)
                .getBody();
    }
    public boolean isTokenValid(String token, User userDetails) {
        String username = extractUsername(token);
        return username.equals(userDetails.getEmail()) && !isTokenExpired(token);
    }

    private boolean isTokenExpired(String token) {
        return extractAllClaims(token).getExpiration().before(new Date());
    }
    public String createRefreshToken(User user){
        String token = generateRefreshToken(user);
        RefreshToken refreshToken = new RefreshToken();
        refreshToken.setToken(token);
        refreshToken.setUser(user);
        refreshToken.setSessionId(UUID.randomUUID());
        refreshToken.setFamilyId(UUID.randomUUID());
        refreshToken.setIssuedAt(Instant.now());
        refreshToken.setExpiresAt(Instant.now().plus(7, ChronoUnit.DAYS));
        refreshTokenRepository.save(refreshToken);
        return token;
    }
}
