package com.runaway.project.repository;

import com.github.sarxos.webcam.Webcam;
import com.github.sarxos.webcam.WebcamDiscoveryEvent;
import com.github.sarxos.webcam.WebcamDiscoveryListener;
import com.github.sarxos.webcam.WebcamEvent;
import com.github.sarxos.webcam.WebcamListener;
import com.github.sarxos.webcam.WebcamPicker;
import com.github.sarxos.webcam.WebcamResolution;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Repository;

import javax.imageio.ImageIO;
import java.awt.image.BufferedImage;
import java.io.File;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

@Repository
@AllArgsConstructor
public class WebCamDao implements WebcamListener, WebcamDiscoveryListener {
    private WebCamDaoInter webCamDaoInter;

    private Webcam webcam = null;
    private WebcamPicker webcamPicker = null;
    private List<Webcam> availableWebcams = new ArrayList<>();

    public WebCamDao() {
        Webcam.addDiscoveryListener(this);
        initializeWebcam();
    }

    private void initializeWebcam() {
        webcamPicker = new WebcamPicker();
        webcam = webcamPicker.getSelectedWebcam(); // Use the selected webcam
        if (webcam != null) {
            //webcam = availableWebcams.get(0); // Use the first available webcam
            webcam.setViewSize(WebcamResolution.VGA.getSize());
            webcam.addWebcamListener(this);
        } else {
            System.out.println("카메라를 찾을 수 없습니다...");
            //System.exit(1);
        }
    }

    public void captureImage(String fileName) {
        BufferedImage image = webcam.getImage();
        try {
            ImageIO.write(image, "JPG", new File(fileName));
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    public void startRecording(String fileName) {
        // Logic to start recording
        // You can implement the recording logic similar to the original code
    }

    public void stopRecording() {
        // Logic to stop recording
        // You can implement the recording stop logic similar to the original code
    }

    // Implement WebcamListener methods
    @Override
    public void webcamOpen(WebcamEvent we) {
        System.out.println("카메라가 열렸습니다.");
    }

    @Override
    public void webcamClosed(WebcamEvent we) {
        System.out.println("카메라가 닫혔습니다.");
    }

    @Override
    public void webcamDisposed(WebcamEvent we) {
        System.out.println("카메라가 꺼졌습니다.");
    }

    @Override
    public void webcamImageObtained(WebcamEvent we) {
        // Do nothing here
    }

    // Implement WebcamDiscoveryListener methods
    @Override
    public void webcamFound(WebcamDiscoveryEvent event) {
        if (!availableWebcams.contains(event.getWebcam())) {
            availableWebcams.add(event.getWebcam());
        }
    }

    @Override
    public void webcamGone(WebcamDiscoveryEvent event) {
        availableWebcams.remove(event.getWebcam());
    }
}
