package com.billbot.billbot.entity.auth;


import jakarta.persistence.*;
import lombok.*;

import java.time.Instant;
import java.util.UUID;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Table(
        name = "refreshToken",
        indexes = {
                @Index(name = "idx_rt_user", columnList = "userId"),
                @Index(name = "idx_rt_session", columnList = "sessionId"),
                @Index(name = "idx_rt_family", columnList = "familyId"),
                @Index(name = "idx_rt_token", columnList = "token")
        }
)
public class RefreshToken {
    public enum RevocationReason {
        LOGOUT,
        LOGOUT_ALL,
        PASSWORD_CHANGED,
        TOKEN_REUSE_DETECTED,
        ACCOUNT_COMPROMISED,
        ADMIN_REVOKED
    }
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;
    @NonNull
    @ManyToOne(fetch = FetchType.LAZY,optional = false)
    @JoinColumn(name = "userId",nullable = false)
    private User user;

    @Column(name = "sessionId", nullable = false)
    private UUID sessionId;
    @Column(name = "token", nullable = false, unique = true, length = 255)
    private String token;
    @Column(name = "familyId", nullable = false)
    private UUID familyId;
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "parentTokenId")
    private RefreshToken parentToken;
    @Column(name = "issuedAt", nullable = false)
    private Instant issuedAt;

    @Column(name = "expiresAt", nullable = false)
    private Instant expiresAt;

    @Column(name = "usedAt")
    private Instant usedAt;

    @Column(name = "revokedAt")
    private Instant revokedAt;

    @Column(name = "revocationReason", length = 100)
    @Enumerated(EnumType.STRING)
    private RevocationReason revocationReason;

    @Column(name = "ipAddress", length = 45)
    private String ipAddress;

    @Column(name = "userAgent")
    private String userAgent;

    @Column(name = "createdAt", nullable = false, updatable = false)
    private Instant createdAt;

    @Column(name = "updatedAt", nullable = false)
    private Instant updatedAt;

    @PrePersist
    void onCreate(){
        Instant now = Instant.now();
        createdAt = now;
        updatedAt=now;
    }
    @PreUpdate
    void onUpdate(){
        updatedAt = Instant.now();
    }

}
