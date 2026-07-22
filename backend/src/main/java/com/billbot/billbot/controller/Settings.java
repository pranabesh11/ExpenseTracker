package com.billbot.billbot.controller;

import com.billbot.billbot.DTO.ApiResponse;
import com.billbot.billbot.DTO.settings.SettingsRequest;
import com.billbot.billbot.DTO.settings.SettingsResponse;
import com.billbot.billbot.service.settings.SettingsService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/app")
@RequiredArgsConstructor
public class Settings {
    private final SettingsService settingsService;
    @PostMapping("/settings")
    public ResponseEntity<ApiResponse> saveSettings(@Valid @RequestBody SettingsRequest settingsRequest){
        SettingsRequest response = settingsService.saveSettingsData(settingsRequest);
        return ResponseEntity.ok(new ApiResponse<>(true, "Settings Data Saved", response));
    }
    @PostMapping("/settingsData")
    public ResponseEntity<ApiResponse> getSettingsData(@Valid @RequestBody Long userId){
        SettingsResponse response = settingsService.getSettingsData(userId);
        return ResponseEntity.ok(new ApiResponse<>(true, "Data fetched successfully", response));
    }
}
