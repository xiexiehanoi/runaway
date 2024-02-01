package com.runaway.project.controller;

import com.runaway.project.repository.WebCamDao;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/webcam")
@RequiredArgsConstructor
public class WebCamController {

    private final WebCamDao webCamDao;

//    @Autowired
//    public WebCamController(WebCamDao webCamDao) {
//        this.webCamDao = webCamDao;
//    }

    @GetMapping("/capture")
    public ResponseEntity<String> captureImage(@RequestParam("fileName") String fileName) {
        try {
            webCamDao.captureImage(fileName);
            return new ResponseEntity<>("Image captured successfully", HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>("Failed to capture image", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PostMapping("/start-recording")
    public ResponseEntity<String> startRecording(@RequestParam("fileName") String fileName) {
        try {
            webCamDao.startRecording(fileName);
            return new ResponseEntity<>("Recording started successfully", HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>("Failed to start recording", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PostMapping("/stop-recording")
    public ResponseEntity<String> stopRecording() {
        try {
            webCamDao.stopRecording();
            return new ResponseEntity<>("Recording stopped successfully", HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>("Failed to stop recording", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
