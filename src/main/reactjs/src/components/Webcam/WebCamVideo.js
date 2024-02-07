import React, { useCallback, useEffect, useRef, useState } from 'react';
import Webcam from 'react-webcam';

const WebCamVideo = () => {
    const webcamRef = useRef(null);
    const mediaRecorderRef = useRef(null);
    const [capturing, setCapturing] = useState(false);
    const [recordedChunks, setRecordedChunks] = useState([]);


    const handleDataAvailable = useCallback(({ data }) => {
        console.log("Data Available:", data);
        if (data.size > 0) {
            // setRecordedChunks((prev) => prev.concat(data));
            setRecordedChunks((prev) => [...prev, data]);
        }
    }, [setRecordedChunks]);

    useEffect(() => {
        const initializeMediaRecorder = async () => {

            try {
                const devices = await navigator.mediaDevices.enumerateDevices();
                const videoInputDevices = devices.filter((device) => device.kind === 'videoinput');

                if (videoInputDevices.length === 0) {
                    alert('해당 기기에 카메라가 발견되지 않았습니다. 카메라를 연결해주세요.');
                    return;
                }

                if (webcamRef.current && webcamRef.current.video && webcamRef.current.video.srcObject) {
                    const stream = webcamRef.current.video.srcObject;
                    // mediaRecorderRef.current = new MediaRecorder(webcamRef.current.stream, {
                    mediaRecorderRef.current = new MediaRecorder(stream, {
                        mimeType: "video/webm"
                    });

                    mediaRecorderRef.current.ondataavailable = handleDataAvailable;

                    mediaRecorderRef.current.onstop = () => {
                        // Handle the stop event if needed
                        setCapturing(false);
                    };

                    mediaRecorderRef.current.onstart = () => {
                        // Handle the start event if needed
                        setCapturing(true);
                    };

                }
            } catch (error) {
                console.error('Error initializing media recorder:', error);
            }
        };

        initializeMediaRecorder();
    }, [webcamRef, mediaRecorderRef, handleDataAvailable]);

    const handleStartCaptureClick = useCallback(() => {

        if (webcamRef.current && webcamRef.current.video && webcamRef.current.video.srcObject) {
            const stream = webcamRef.current.video.srcObject;
            mediaRecorderRef.current = new MediaRecorder(stream, {
                mimeType: "video/webm"
            });

            mediaRecorderRef.current.ondataavailable = handleDataAvailable;

            mediaRecorderRef.current.onstop = () => {
                setCapturing(false);
            };

            mediaRecorderRef.current.onstart = () => {
                setCapturing(true);
            };
            setRecordedChunks([]);
            mediaRecorderRef.current.start();
        }
    }, [webcamRef, mediaRecorderRef, handleDataAvailable]);


    const handleStopCaptureClick = useCallback(() => {
        if (mediaRecorderRef.current && mediaRecorderRef.current.state === "recording") {
            mediaRecorderRef.current.stop();
            // console.log("Stop capturing. Recorded chunks:", recordedChunks); // 확인을 위한 로그 추가
        }
    }, [mediaRecorderRef]);


    const handleDownload = useCallback(() => {
        if (recordedChunks.length) {
            const blob = new Blob(recordedChunks, {
                type: "video/webm"
            });
            const url = URL.createObjectURL(blob);
            const a = document.createElement("a");
            document.body.appendChild(a);
            a.style = "display:none";
            a.href = url;
            a.download = "react-webcam-stream-capture.webm";
            a.click();
            window.URL.revokeObjectURL(url);
        }
    }, [recordedChunks]);

    return (
        <span className="WebCamContainer">
            <Webcam
                audio={false} //나중에 true 로 바꿔야 오디오도 녹음 됨
                ref={webcamRef}
                mirrored={true}
                videoConstraints={{
                    facingMode: 'user',
                    aspectRatio: window.innerWidth <= 768 && window.innerWidth > 360 ?
                        window.innerWidth / window.innerHeight : 360 / 740,
                    width: window.innerWidth <= 768 && window.innerWidth > 360 ? window.innerWidth : 360,
                    height: window.innerWidth <= 768 && window.innerWidth > 360 ? window.innerHeight : 720,
                }}
            />
            {capturing ? (
                <button className="WebCamStopBtn"
                    onClick={handleStopCaptureClick}>Stop Capture</button>
            ) : (
                <button className="WebCamStartBtn"
                    onClick={handleStartCaptureClick}>Start Capture</button>
            )}
            {recordedChunks.length > 0 && (
                <button className="WebCamVideoDownloadBtn"
                    onClick={handleDownload}>Download</button>
            )}
        </span>
    );
};

export default WebCamVideo;