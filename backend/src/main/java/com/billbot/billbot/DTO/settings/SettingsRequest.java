package com.billbot.billbot.DTO.settings;
import lombok.*;
import org.springframework.web.multipart.MultipartFile;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class SettingsRequest {
    private Long id;
    private MultipartFile profilePicture;
    private String firstName;
    private String lastName;
    private String nickName;
    private String phone;
    private String upiId;
    private String address;
    private String currency;
    private String language;
    private String about;
    private MultipartFile  upiQrCode;
}
