import React, { useCallback, useEffect, useRef, useState } from 'react';
import Webcam from 'react-webcam';
import WebCamTimer from './WebCamTimer';
import axios from 'axios';


const WebCamVideo = () => {
    const webcamRef = useRef(null);
    const mediaRecorderRef = useRef(null);
    const [capturing, setCapturing] = useState(false);
    const [recordedChunks, setRecordedChunks] = useState([]);
    const [timer, setTimer] = useState(null); // timer 상태 추가
    const [elapsedTime, setElapsedTime] = useState(10);
    const [mimeType, setMimeType] = useState('');
    // 줌 관련 변수 및 상태
    const [zoomValue, setZoomValue] = useState(1);

    const BASE_URI = process.env.REACT_APP_BACKEND_URL;
    const token = window.localStorage.getItem("token");
    // const videoUrl = "https://kr.object.ncloudstorage.com/runaway/runaway_story/";

    const getParams = (video, audio) => {
        return {
            video: {
                deviceId: video ? { exact: video } : undefined,
                pan: true,
                tilt: true,
                zoom: true
            },
            audio: {
                deviceId: audio ? { exact: audio } : undefined,
                options: {
                    muted: true,
                    mirror: true
                }
            }
        }
    }

    const handleDataAvailable = useCallback(({ data }) => {
        console.log("Data Available:", data);
        if (data.size > 0) {
            // setRecordedChunks((prev) => prev.concat(data));
            setRecordedChunks((prev) => [...prev, data]);
        }
    }, [setRecordedChunks]);



    useEffect(() => {
        const startWebcam = async () => {
            const stream = await navigator.mediaDevices.getUserMedia(getParams(null, null));
            const track = stream.getVideoTracks()[0];
            const capabilities = track.getCapabilities();
            setMimeType('video/mp4'); // 임시로 설정

            // Zoom 관련 설정
            if ('zoom' in capabilities) {
                const zoomInput = document.querySelector('#zoomInput');
                zoomInput.min = capabilities.zoom.min;
                zoomInput.max = capabilities.zoom.max;
                zoomInput.step = capabilities.zoom.step;
                zoomInput.value = track.getSettings().zoom;
                zoomInput.disabled = false;
                zoomInput.oninput = async () => {
                    try {
                        await track.applyConstraints({ advanced: [{ zoom: zoomInput.value }] });
                        setZoomValue(zoomInput.value);
                    } catch (err) {
                        console.log(err);
                    }
                };
            }


            try {
                const devices = await navigator.mediaDevices.enumerateDevices();
                const videoInputDevices = devices.filter((device) => device.kind === 'videoinput');

                if (videoInputDevices.length === 0) {
                    alert('해당 기기에 카메라가 발견되지 않았습니다. 카메라를 연결해주세요.');
                    return;
                }

                if (webcamRef.current && webcamRef.current.video && webcamRef.current.video.srcObject) {
                    const stream = webcamRef.current.video.srcObject;

                    let type = 'video/webm';
                    if (!MediaRecorder.isTypeSupported(type)) {
                        type = 'video/mp4';
                        if (!MediaRecorder.isTypeSupported(type)) {
                            alert('모바일 브라우저에서 지원되지 않는 mimeType입니다.');
                            return;
                        }
                    }
                    setMimeType(type);

                    // let mimeType = MediaRecorder.isTypeSupported('video/webm') ? 'video/webm' : 'video/mp4'; // MIME 유형 동적으로 결정
                    // mediaRecorderRef.current = new MediaRecorder(webcamRef.current.stream, {
                    mediaRecorderRef.current = new MediaRecorder(stream, {
                        // mimeType: "video/mp4"
                        mimeType: type
                    });

                    mediaRecorderRef.current.ondataavailable = handleDataAvailable;

                    mediaRecorderRef.current.onstop = () => {
                        // Handle the stop event if needed
                        setCapturing(false);
                    };

                }
            } catch (error) {
                console.error('Error initializing media recorder:', error);
            }
        };

        startWebcam();
    }, [webcamRef, mediaRecorderRef, handleDataAvailable]);

    // useEffect(() => {
    //     const initializeMediaRecorder = async () => {

    //         try {
    //             const devices = await navigator.mediaDevices.enumerateDevices();
    //             const videoInputDevices = devices.filter((device) => device.kind === 'videoinput');

    //             if (videoInputDevices.length === 0) {
    //                 alert('해당 기기에 카메라가 발견되지 않았습니다. 카메라를 연결해주세요.');
    //                 return;
    //             }

    //             if (webcamRef.current && webcamRef.current.video && webcamRef.current.video.srcObject) {
    //                 const stream = webcamRef.current.video.srcObject;

    //                 let type = 'video/webm';
    //                 if (!MediaRecorder.isTypeSupported(type)) {
    //                     type = 'video/mp4';
    //                     if (!MediaRecorder.isTypeSupported(type)) {
    //                         alert('모바일 브라우저에서 지원되지 않는 mimeType입니다.');
    //                         return;
    //                     }
    //                 }
    //                 setMimeType(type);

    //                 // let mimeType = MediaRecorder.isTypeSupported('video/webm') ? 'video/webm' : 'video/mp4'; // MIME 유형 동적으로 결정
    //                 // mediaRecorderRef.current = new MediaRecorder(webcamRef.current.stream, {
    //                 mediaRecorderRef.current = new MediaRecorder(stream, {
    //                     // mimeType: "video/mp4"
    //                     mimeType: type
    //                 });

    //                 mediaRecorderRef.current.ondataavailable = handleDataAvailable;

    //                 mediaRecorderRef.current.onstop = () => {
    //                     // Handle the stop event if needed
    //                     setCapturing(false);
    //                 };

    //             }
    //         } catch (error) {
    //             console.error('Error initializing media recorder:', error);
    //         }
    //     };

    //     initializeMediaRecorder();
    // }, [webcamRef, mediaRecorderRef, handleDataAvailable]);

    const handleStopCaptureClick = useCallback(() => {
        if (mediaRecorderRef.current && mediaRecorderRef.current.state === "recording") {
            mediaRecorderRef.current.stop();
            clearInterval(timer); // 타이머 멈춤
            // setCapturing(false);
            // setTimer(null);
            setElapsedTime(10); // 타이머 초기화
            // console.log("Stop capturing. Recorded chunks:", recordedChunks); // 확인을 위한 로그 추가
        }
    }, [mediaRecorderRef, timer]);

    const handleStartCaptureClick = useCallback(() => {

        if (webcamRef.current && webcamRef.current.video && webcamRef.current.video.srcObject) {
            const stream = webcamRef.current.video.srcObject;
            mediaRecorderRef.current = new MediaRecorder(stream, {
                // mimeType: "video/mp4"
                mimeType: mimeType
            });

            mediaRecorderRef.current.ondataavailable = handleDataAvailable;

            mediaRecorderRef.current.onstop = () => {
                setCapturing(false);
            };

            const newTimer = setInterval(() => {
                setElapsedTime((prev) => {
                    if (prev <= 0) {
                        clearInterval(newTimer);
                        handleStopCaptureClick();
                        return 0;
                    }
                    return prev - 1;
                });
            }, 1000);

            setCapturing(true);
            setTimer(newTimer);
            setRecordedChunks([]);
            setElapsedTime(10); // 녹화 시작 시간을 10으로 재설정
            mediaRecorderRef.current.start();
        }
    }, [webcamRef, mediaRecorderRef, handleDataAvailable, mimeType, handleStopCaptureClick]);

    // const handleDownload = useCallback(() => {
    //     if (recordedChunks.length) {
    //         const blob = new Blob(recordedChunks, {
    //             type: mimeType
    //         });
    //         const uploadVideo = new FormData();
    //         uploadVideo.append('upload', blob, 'runaway-story.mp4');

    //         axios({
    //             method: 'post',
    //             url: `${BASE_URI}/api/story/save`,
    //             data: uploadVideo,
    //             headers: {
    //                 'Content-Type': 'multipart/form-data',
    //                 Authorization: token
    //             }
    //         }).then(res => {
    //             console.log("Story Uploaded successfully:", res.data);
    //             alert("Story Uploaded successfully");
    //             // 파일이 업로드된 후 클라우드 스토리지에서 반환한 파일 경로를 사용하여 다운로드 처리 등 추가 작업 수행 가능

    //         }).catch(error => {
    //             console.error("Error uploading file:", error);
    //         });

    //         // const url = URL.createObjectURL(blob);
    //         // const a = document.createElement("a");
    //         // document.body.appendChild(a);
    //         // a.style = "display:none";
    //         // a.href = url;
    //         // a.download = "runaway-story.mp4";
    //         // a.click();
    //         // window.URL.revokeObjectURL(url);

    //         // const video = document.getElementById("video-replay");
    //         // video.src = url
    //     }
    // }, [recordedChunks, mimeType, BASE_URI, token]);

    const handleDownload = useCallback(async () => {
        if (recordedChunks.length) {
            try {
                const blob = new Blob(recordedChunks, {
                    type: mimeType
                });
                const uploadVideo = new FormData();
                uploadVideo.append('upload', blob, 'runaway-story.mp4');

                const res = await axios.post(`${BASE_URI}/api/story/save`, uploadVideo, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        Authorization: token
                    }
                });

                console.log("Story Uploaded successfully:", res.data);
                alert("Story Uploaded successfully");
            } catch (error) {
                console.error("Error uploading file:", error);
            }
        }
    }, [recordedChunks, mimeType, BASE_URI, token]);

    return (
        <span className="WebCamContainer">
            <Webcam
                style={{ height: '100%' }}
                audio={false} //나중에 true 로 바꿔야 오디오도 녹음 됨
                ref={webcamRef}
                mirrored={true}
                // maxScale={5}
                // scale={1.0}
                videoConstraints={{
                    facingMode: 'user',
                    // aspectRatio: window.innerWidth / window.innerHeight,
                    aspectRatio: window.innerHeight / window.innerWidth,
                    // aspectRatio: window.innerWidth <= 768 && window.innerWidth > 360 ?
                    //     window.innerWidth / window.innerHeight : 360 / 740,
                    // window.innerWidth / window.innerHeight : 360 / 740,
                    // width: window.innerWidth <= 768 && window.innerWidth > 360 ? window.innerWidth : 360,
                    // height: window.innerWidth <= 768 && window.innerWidth > 360 ? window.innerHeight : 720,

                    width: window.innerHeight,
                    height: window.innerWidth,
                }}
            />

            <div>
                Zoom: <input className="ZoomControl" id="zoomInput" type="range" min="1" max="10" step="0.1" />
                Zoom Level: {zoomValue}
            </div>

            {/* <video id="video-replay" height="400" width="500" controls></video> */}
            {capturing ? (
                <button className="WebCamStopBtn" onClick={handleStopCaptureClick}>Stop Capture</button>
            ) : (
                <button className="WebCamStartBtn" onClick={handleStartCaptureClick}>Start Capture</button>
            )}
            {elapsedTime === 0 && !capturing && (
                <button className="WebCamStartBtn" onClick={handleStartCaptureClick}>Start Capture</button>
            )}
            {recordedChunks.length > 0 && (
                <button className="WebCamVideoDownloadBtn" onClick={handleDownload}>Download</button>
            )}
            <WebCamTimer elapsedTime={elapsedTime} />
        </span>
    );
};

export default WebCamVideo;