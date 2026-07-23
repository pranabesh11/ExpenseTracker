package com.billbot.billbot.entity.settings;

import jakarta.persistence.*;

@Entity
@Table(name = "settings_field_options")
public class SettingsFieldOptions {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "field_id")
    private SettingsFormMetaData field;
    private String label;
    private String value;
    private int displayOrder;
}
