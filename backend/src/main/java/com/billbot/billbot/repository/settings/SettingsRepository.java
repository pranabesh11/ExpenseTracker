package com.billbot.billbot.repository.settings;

import com.billbot.billbot.DTO.settings.SettingsRequest;
import com.billbot.billbot.entity.settings.Settings;
import org.springframework.data.jpa.repository.JpaRepository;

public interface SettingsRepository extends JpaRepository<Settings,Long> {
}
