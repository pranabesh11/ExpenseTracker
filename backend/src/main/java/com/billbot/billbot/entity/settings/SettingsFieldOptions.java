package com.billbot.billbot.entity.settings;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "settings_field_options")
@Getter
@Setter
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
