package com.billbot.billbot.entity.settings;

import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

public class SettingsFormMetaData {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String key;
    private String label;
    private String type;
    private boolean required;
    private int displayOrder;
}
