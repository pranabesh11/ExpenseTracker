package com.billbot.billbot.entity.settings;

import com.billbot.billbot.entity.auth.User;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Table(
    name = "settings"
)
public class Settings {
    public enum Currency{
        INR,
        EUR,
        USD
    }
    public enum Language{
        ENGLISH,
        BENGALI,
        GERMAN
    }
    @Id
    private Long userId;
    @OneToOne
    @MapsId
    @JoinColumn(name = "user_id")
    private User user;
    @Lob
    @Basic(fetch = FetchType.LAZY)
    @Column(columnDefinition = "BYTEA")
    private byte[] profilePicture;

    private String firstName;
    private String lastName;
    private String nickName;
    private String phoneNo;
    private String upiId;
    private String address;
    @Enumerated(EnumType.STRING)
    private Currency currency;
    @Enumerated(EnumType.STRING)
    private Language language;
    private String about;
    @Lob
    @Basic(fetch = FetchType.LAZY)
    @Column(columnDefinition = "BYTEA")
    private byte[] upiQrCode;
}
