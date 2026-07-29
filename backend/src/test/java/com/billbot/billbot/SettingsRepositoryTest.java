package com.billbot.billbot;

import com.billbot.billbot.entity.settings.SettingsFormMetaData;
import com.billbot.billbot.repository.settings.SettingsFormMetadataRepository;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

@SpringBootTest
public class SettingsRepositoryTest {

    @Autowired
    private SettingsFormMetadataRepository settingsFormMetadataRepository;

    @Test
    void testFindByKey(){
        System.out.println("hello");
    }
}