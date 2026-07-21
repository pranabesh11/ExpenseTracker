package com.billbot.billbot.DTO.settings;

import jakarta.persistence.Lob;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class SettingsRequest {
    private Long id;
    @Lob
    private byte[] profilePicture;
    private String firstName;
    private String lastName;
    private String nickName;
    private String phone;
    private String upiId;
    private String address;
    private String currency;
    private String language;
    private String about;
    private byte[] upiQrCode;
}
