package com.billbot.billbot;

import com.billbot.billbot.entity.settings.Settings;
import com.billbot.billbot.entity.settings.SettingsFormMetaData;
import com.billbot.billbot.repository.settings.SettingsFormMetadataRepository;
import com.billbot.billbot.repository.settings.SettingsRepository;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

@SpringBootTest
public class SettingsRepositoryTest {

    @Autowired
    private SettingsFormMetadataRepository settingsFormMetadataRepository;
    @Autowired
    private SettingsRepository settingsRepository;

    @Test
    void testFindByKey(){
        Long l1 = settingsFormMetadataRepository.findByKey("firstName").getId();
        Settings existing = settingsRepository.findByUserIdAndFieldId(7l, 1l);  // returning null this is the problem.
        System.out.println("********************"+existing);
    }
}