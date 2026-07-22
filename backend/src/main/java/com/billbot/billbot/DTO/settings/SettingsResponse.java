package com.billbot.billbot.DTO.settings;

import com.billbot.billbot.entity.settings.Settings;
import jakarta.persistence.Lob;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class SettingsResponse {
    @Lob
    private byte[] profilePicture;
    private String firstName;
    private String lastName;
    private String nickName;
    private String email;
    private String emailKey;
    private String emailType;
    private String phone;
    private String upiId;
    private String address;
    private Settings.Currency currency;
    private Settings.Language language;
    private String about;
    private byte[] upiQrCode;
    private Settings.Currency[] allCurrency;
    private Settings.Language[] allLanguage;
}
