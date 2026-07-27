package com.billbot.billbot.repository.settings;

import com.billbot.billbot.DTO.settings.SettingsFormStructure;
import com.billbot.billbot.entity.settings.SettingsFormMetaData;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface SettingsFormMetadataRepository extends JpaRepository<SettingsFormMetaData, Long> {
    List<SettingsFormStructure.Option> findAllByFieldId(Long id);
}
