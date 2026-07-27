package com.billbot.billbot.DTO.settings;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class SettingsFormStructure {

    private List<EachRow> rows;

    @Getter
    @Setter
    @NoArgsConstructor
    @AllArgsConstructor
    public static class EachRow {
        private String key;
        private String label;
        private String type;
        private boolean required;
        private int order;
        private String value;
    }

    @Getter
    @Setter
    @NoArgsConstructor
    @AllArgsConstructor
    public static class SelectRow extends EachRow {
        private List<Option> options;
    }

    @Getter
    @Setter
    @NoArgsConstructor
    @AllArgsConstructor
    public static class Option {
        private String label;
        private String value;
        private int order;
    }
}