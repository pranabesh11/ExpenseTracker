package com.billbot.billbot.controller;

import com.billbot.billbot.DTO.ApiResponse;
import com.billbot.billbot.DTO.settings.SettingsFormStructure;
import com.billbot.billbot.DTO.settings.SettingsRequest;
import com.billbot.billbot.DTO.settings.SettingsResponse;
import com.billbot.billbot.service.settings.SettingsService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Map;

@RestController
@RequestMapping("/app")
@RequiredArgsConstructor
public class Settings {
    private final SettingsService settingsService;
    @PostMapping("/settingsData")
    public ResponseEntity<ApiResponse> getSettingsData(@Valid @RequestBody Long userId){
        SettingsFormStructure response = settingsService.getSettingsData(userId);
        return ResponseEntity.ok(new ApiResponse<>(true, "Data fetched successfully", response));
    }
    @PostMapping(value = "/settingsSave", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<ApiResponse> saveSettings( @RequestParam Map<String, String> fields, @RequestParam Map<String, MultipartFile> files)throws IOException {
        boolean response = settingsService.saveSettingsData(fields, files);
        return ResponseEntity.ok(new ApiResponse<>(true, "Settings Data Saved", response));
    }
}
