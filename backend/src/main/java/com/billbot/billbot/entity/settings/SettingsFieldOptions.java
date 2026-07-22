package com.billbot.billbot.entity.settings;

import jakarta.persistence.*;

@Entity
@Table(name = "")
public class SettingsFieldOptions {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private Long fieldId;
    private String value;
}
