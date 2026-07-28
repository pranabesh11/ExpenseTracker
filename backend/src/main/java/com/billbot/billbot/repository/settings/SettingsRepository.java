package com.billbot.billbot.repository.settings;

import com.billbot.billbot.DTO.settings.SettingsRequest;
import com.billbot.billbot.entity.settings.Settings;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface SettingsRepository extends JpaRepository<Settings,Long> {
    Settings findByUserIdAndFieldId(Long userId, Long fieldId);
}
