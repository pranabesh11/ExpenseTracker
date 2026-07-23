package com.billbot.billbot.service.settings;
import com.billbot.billbot.DTO.settings.SettingsRequest;
import com.billbot.billbot.DTO.settings.SettingsResponse;
import com.billbot.billbot.entity.auth.User;
import com.billbot.billbot.entity.settings.Settings;
import com.billbot.billbot.repository.auth.UserRepository;
import com.billbot.billbot.repository.settings.SettingsRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

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
        return new SettingsRequest();
    }
    public SettingsResponse getSettingsData(Long userId){
        boolean doesExist = settingsRepository.existsById(userId);
        if(doesExist) {
            Settings settings = settingsRepository.findById(userId).orElseThrow(() -> new RuntimeException("Settings not found for this user"));
            SettingsResponse settingsResponse = new SettingsResponse();
            return settingsResponse;
        }else{
            SettingsResponse settingsResponse = new SettingsResponse();
            settingsResponse.setProfilePicture(null);
            settingsResponse.setFirstName(null);
            settingsResponse.setLastName(null);
            settingsResponse.setNickName(null);
            settingsResponse.setEmail(userRepository.findById(userId).get().getEmail());
            settingsResponse.setPhone(null);
            settingsResponse.setUpiId(null);
            settingsResponse.setAddress(null);
            settingsResponse.setAbout(null);
            settingsResponse.setUpiQrCode(null);
            return settingsResponse;
        }
    }
}
