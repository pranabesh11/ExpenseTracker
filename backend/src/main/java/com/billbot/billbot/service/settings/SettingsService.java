package com.billbot.billbot.service.settings;
import com.billbot.billbot.DTO.settings.SettingsFormStructure;
import com.billbot.billbot.DTO.settings.SettingsRequest;
import com.billbot.billbot.DTO.settings.SettingsResponse;
import com.billbot.billbot.entity.auth.User;
import com.billbot.billbot.entity.settings.Settings;
import com.billbot.billbot.entity.settings.SettingsFormMetaData;
import com.billbot.billbot.repository.auth.UserRepository;
import com.billbot.billbot.repository.settings.SettingsFormMetadataRepository;
import com.billbot.billbot.repository.settings.SettingsRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class SettingsService{
    private final SettingsRepository settingsRepository;
    private final UserRepository userRepository;
    private final SettingsFormMetadataRepository settingsFormMetadataRepository;
    @Transactional
    public SettingsRequest saveSettingsData(SettingsRequest settingsRequest){
        Settings settings;
        settings = settingsRepository.findById(settingsRequest.getId()).orElse(null);
        if(settings != null){
            settings = settingsRepository.findById(settingsRequest.getId()).orElseThrow(null);
        }else{
            User user = userRepository.findById(settingsRequest.getId()).orElseThrow(null);
            settings = new Settings();
            settings.setUser(user);
        }
        return new SettingsRequest();
    }
    public SettingsFormStructure getSettingsData(Long userId){
        List<SettingsFormMetaData> settingsData  = settingsFormMetadataRepository.findAll();
        List<SettingsFormStructure.EachRow> eachRows = settingsData.stream().map(data ->{
            if("select".equalsIgnoreCase(data.getType())){
                SettingsFormStructure.SelectRow selectRow = new SettingsFormStructure.SelectRow();
                selectRow.setKey(data.getKey());
                selectRow.setLabel(data.getLabel());
                selectRow.setType(data.getType());
                selectRow.setRequired(data.isRequired());
                selectRow.setOrder(data.getDisplayOrder());
                List<SettingsFormStructure.Option> options = data.getOptions().stream().map(option->{
                    SettingsFormStructure.Option opt = new SettingsFormStructure.Option();
                    opt.setLabel(option.getLabel());
                    opt.setValue(option.getValue());
                    return opt;
                }).toList();
                selectRow.setOptions(options);
                selectRow.setValue(settingsRepository.findByUserIdAndFieldId(userId, data.getId()));
                return selectRow;
            }else{
                SettingsFormStructure.EachRow row = new SettingsFormStructure.EachRow();
                row.setKey(data.getKey());
                row.setLabel(data.getLabel());
                row.setType(data.getType());
                row.setRequired(data.isRequired());
                row.setOrder(data.getDisplayOrder());
                row.setValue(settingsRepository.findByUserIdAndFieldId(userId, data.getId()));
                return row;
            }
        }).toList();
        SettingsFormStructure settingsResponse = new SettingsFormStructure();
        settingsResponse.setRows(eachRows);
        return settingsResponse;
    }
}
