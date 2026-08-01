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
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class SettingsService{
    private final SettingsRepository settingsRepository;
    private final UserRepository userRepository;
    private final SettingsFormMetadataRepository settingsFormMetadataRepository;
    @Transactional
    public boolean saveSettingsData(Map<String, String> fields, Map<String, MultipartFile> files) throws IOException {
        String id = fields.get("id");
        User user = userRepository.findById(Long.parseLong(id)).orElseThrow(() -> new RuntimeException("User not found"));
        fields.forEach((key, value)->{
            Settings settings = new Settings();
            if(!"id".equalsIgnoreCase(key)) {
                Settings existing = settingsRepository.findByUser_IdAndField_Id(Long.parseLong(id), settingsFormMetadataRepository.findByKey(key).getId()).orElse(null);
                if(existing == null) {
                    settings.setUser(user);
                    settings.setField(settingsFormMetadataRepository.findByKey(key));
                    settings.setValue(value);
                    settingsRepository.save(settings);
                }else{
                    existing.setValue(value);
                    settingsRepository.save(existing);
                }
            }
        });
        String uploadPath = "F:\\java\\ETrack\\ETrack\\ExpenseTracker\\backend\\uploads";
        files.forEach((key, file)->{
            try {
                String originalFileName = file.getOriginalFilename();
                String extension = "";
                if (originalFileName != null && originalFileName.contains(".")) {
                    extension = originalFileName.substring(originalFileName.lastIndexOf("."));
                }
                String newFileName = UUID.randomUUID() + extension;
                Path uploadDir = Paths.get(uploadPath);
                if (!Files.exists(uploadDir)) {
                    Files.createDirectories(uploadDir);
                }
                Path filePath = uploadDir.resolve(newFileName);
                Files.copy(file.getInputStream(), filePath);
                SettingsFormMetaData field = settingsFormMetadataRepository.findByKey(key);
                Settings existing = settingsRepository.findByUser_IdAndField_Id(Long.parseLong(id), field.getId()).orElse(null);
                if (existing == null) {
                    Settings settings = new Settings();
                    settings.setUser(user);
                    settings.setField(field);
                    settings.setValue(newFileName);
                    settingsRepository.save(settings);
                } else {
                    existing.setValue(newFileName);
                    settingsRepository.save(existing);
                }
            }catch (IOException exception){
                throw new RuntimeException(exception);
            }
        });
        return true;
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
                selectRow.setValue(settingsRepository.findByUserIdAndFieldId(userId, data.getId()).getValue());
                return selectRow;
            }else{
                SettingsFormStructure.EachRow row = new SettingsFormStructure.EachRow();
                row.setKey(data.getKey());
                row.setLabel(data.getLabel());
                row.setType(data.getType());
                row.setRequired(data.isRequired());
                row.setOrder(data.getDisplayOrder());
                if("email".equalsIgnoreCase(data.getType())){
                    row.setValue(userRepository.findById(userId).get().getEmail());
                }else{
                    row.setValue(settingsRepository.findByUserIdAndFieldId(userId, data.getId()).getValue());
                }
                return row;
            }
        }).toList();
        SettingsFormStructure settingsResponse = new SettingsFormStructure();
        settingsResponse.setRows(eachRows);
        return settingsResponse;
    }
}
