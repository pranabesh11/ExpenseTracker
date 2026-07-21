package com.billbot.billbot.service.settings;
import com.billbot.billbot.DTO.settings.SettingsRequest;
import com.billbot.billbot.entity.auth.User;
import com.billbot.billbot.entity.settings.Settings;
import com.billbot.billbot.repository.auth.UserRepository;
import com.billbot.billbot.repository.settings.SettingsRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class SettingsService{
    private final SettingsRepository settingsRepository;
    private final UserRepository userRepository;
    @Transactional
    public SettingsRequest saveSettingsData(SettingsRequest settingsRequest){
        Settings settings;
        settings = settingsRepository.findById(settingsRequest.getId()).orElse(null);
        if(settings != null){
            settings = settingsRepository.findById(settingsRequest.getId()).orElseThrow(null);
        }else{
            User user = userRepository.findById(settingsRequest.getId()).orElseThrow(null);
            settings = new Settings();
            settings.setUser(user);
        }
        settings.setProfilePicture(settingsRequest.getProfilePicture());
        settings.setFirstName(settingsRequest.getFirstName());
        settings.setLastName(settingsRequest.getLastName());
        settings.setNickName(settingsRequest.getNickName());
        settings.setPhoneNo(settingsRequest.getPhone());
        settings.setUpiId(settingsRequest.getUpiId());
        settings.setAddress(settingsRequest.getAddress());
        settings.setCurrency(Settings.Currency.valueOf(settingsRequest.getCurrency()));
        settings.setLanguage(Settings.Language.valueOf(settingsRequest.getLanguage()));
        settings.setAbout(settingsRequest.getAbout());
        settings.setUpiQrCode(settingsRequest.getUpiQrCode());
        settingsRepository.save(settings);
        return mapToRequest(settings);
    }
    private SettingsRequest mapToRequest(Settings settings) {
        SettingsRequest request = new SettingsRequest();

        request.setId(settings.getUserId());
        request.setProfilePicture(settings.getProfilePicture());
        request.setFirstName(settings.getFirstName());
        request.setLastName(settings.getLastName());
        request.setNickName(settings.getNickName());
        request.setPhone(settings.getPhoneNo());
        request.setUpiId(settings.getUpiId());
        request.setAddress(settings.getAddress());
        request.setCurrency(settings.getCurrency().name());
        request.setLanguage(settings.getLanguage().name());
        request.setAbout(settings.getAbout());
        request.setUpiQrCode(settings.getUpiQrCode());

        return request;
    }
}
