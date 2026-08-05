package com.billbot.billbot.controller;

import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

@RestController
@RequestMapping("/app")
public class FileController {


    private final String uploadPath =
            "F:\\java\\ETrack\\ETrack\\ExpenseTracker\\backend\\uploads";


    @GetMapping("/files/{filename}")
    public ResponseEntity<Resource> getFile(
            @PathVariable String filename
    ) throws Exception {

        Path path = Paths.get(uploadPath).resolve(filename);

        Resource resource = new UrlResource(path.toUri());

        if (!resource.exists()) {
            return ResponseEntity.notFound().build();
        }

        String contentType = Files.probeContentType(path);

        return ResponseEntity.ok()
                .contentType(MediaType.parseMediaType(contentType))
                .body(resource);
    }
}