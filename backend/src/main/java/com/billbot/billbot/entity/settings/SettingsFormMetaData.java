package com.billbot.billbot.entity.settings;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "form_field_metadata")
public class SettingsFormMetaData {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(unique = true)
    private String key;
    private String label;
    private String type;
    private boolean required;
    private int displayOrder;
    @OneToMany(mappedBy = "field", cascade = CascadeType.ALL)
    private List<SettingsFieldOptions> options;

}
