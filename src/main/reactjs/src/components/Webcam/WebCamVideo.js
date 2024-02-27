import React, { useCallback, useEffect, useRef, useState } from 'react';
import Webcam from 'react-webcam';
import WebCamTimer from './WebCamTimer';
import axios from 'axios';
import closeW from '../../image/close-white.png';
import switchCameraW from '../../image/switchCameraW.png';
import { useNavigate } from 'react-router-dom';


const WebCamVideo = () => {
    const webcamRef = useRef(null);
    const mediaRecorderRef = useRef(null);
    const [capturing, setCapturing] = useState(false);
    const [recordedChunks, setRecordedChunks] = useState([]);
    const [timer, setTimer] = useState(null); // timer 상태 추가
    const [elapsedTime, setElapsedTime] = useState(6);
    const [mimeType, setMimeType] = useState('');
    // 줌 관련 변수 및 상태
    const [zoomValue, setZoomValue] = useState(1);
    const [selectedZoomButton, setSelectedZoomButton] = useState('zoomnormal'); // 선택된 줌 버튼
    const [isMobile, setIsMobile] = useState(false); // 추가: 모바일 여부 상태
    const [facingMode, setFacingMode] = useState('user'); // 카메라 방향 상태 추가

    const BASE_URI = process.env.REACT_APP_BACKEND_URL;
    const token = window.localStorage.getItem("token");
    // const videoUrl = "https://kr.object.ncloudstorage.com/runaway/runaway_story/";
    const navi = useNavigate();

    useEffect(() => {
        const isDeviceMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
        setIsMobile(isDeviceMobile);
    }, []);

    // const getParams = (video, audio) => {
    //     return {
    //         video: {
    //             deviceId: video ? { exact: video } : undefined,
    //             pan: true,
    //             tilt: true,
    //             zoom: true
    //         },
    //         audio: {
    //             deviceId: audio ? { exact: audio } : undefined,
    //             options: {
    //                 muted: true,
    //                 mirror: true
    //             }
    //         }
    //     }
    // }

    const handleDataAvailable = useCallback(({ data }) => {
        console.log("Data Available:", data);
        if (data.size > 0) {
            // setRecordedChunks((prev) => prev.concat(data));
            setRecordedChunks((prev) => [...prev, data]);
        }
    }, [setRecordedChunks]);



    useEffect(() => {
        const startWebcam = async () => {
            // const stream = await navigator.mediaDevices.getUserMedia(getParams(null, null));
            // const track = stream.getVideoTracks()[0];
            // const capabilities = track.getCapabilities();
            setMimeType('video/mp4'); // 임시로 설정

            // Zoom 관련 설정
            // if ('zoom' in capabilities) {
            //     const zoomInput = document.querySelector('#zoomInput');
            //     zoomInput.min = capabilities.zoom.min;
            //     zoomInput.max = capabilities.zoom.max;
            //     zoomInput.step = capabilities.zoom.step;
            //     zoomInput.value = track.getSettings().zoom;
            //     zoomInput.disabled = false;
            //     zoomInput.oninput = async () => {
            //         try {
            //             await track.applyConstraints({ advanced: [{ zoom: zoomInput.value }] });
            //             setZoomValue(zoomInput.value);
            //         } catch (err) {
            //             console.log(err);
            //         }
            //     };
            // }


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

    const handleStopCaptureClick = useCallback(() => {
        if (mediaRecorderRef.current && mediaRecorderRef.current.state === "recording") {
            mediaRecorderRef.current.stop();
            clearInterval(timer); // 타이머 멈춤
            // setCapturing(false);
            // setTimer(null);
            setElapsedTime(6); // 타이머 초기화
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
            setElapsedTime(6); // 녹화 시작 시간을 10으로 재설정
            mediaRecorderRef.current.start();
        }
    }, [webcamRef, mediaRecorderRef, handleDataAvailable, mimeType, handleStopCaptureClick]);

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

    const CloseWebCam = useCallback(() => {
        navi('/story'); // 페이지 이동
    }, [navi]);

    const handleZoomButtonClick = (value) => {
        setZoomValue(value);
        setSelectedZoomButton(value);
        // 줌 값을 변경할 때마다 웹캠에 반영
        const zoomInput = value; // 줌 값에 10을 곱해서 0.1 단위로 설정

        const isMirrored = facingMode === 'user';
        const transformValue = isMirrored ? `scale(-${zoomInput}, ${zoomInput})` : `scale(${zoomInput}, ${zoomInput})`;
        // webcamRef.current.video.style.transform = `scale(${zoomInput})`;
        webcamRef.current.video.style.transform = transformValue;
    };


    const toggleFacingMode = useCallback(async () => {
        try {
            // 현재 카메라 방향을 반대로 변경
            const newFacingMode = facingMode === 'user' ? 'environment' : 'user';
            setFacingMode(newFacingMode);

            // 현재 비디오 트랙을 중지
            webcamRef.current.video.srcObject.getVideoTracks().forEach(track => {
                track.stop();
            });

            // 새로운 facingMode 설정을 반영한 비디오 트랙 가져오기
            const stream = await navigator.mediaDevices.getUserMedia({
                video: { facingMode: newFacingMode }
            });

            // 새로운 비디오 스트림 설정 및 미러링 적용
            webcamRef.current.video.srcObject = stream;
            // webcamRef.current.video.mirrored = newFacingMode === 'user' ? 'scale(-1, 1)' : 'scale(1, 1)';

            const isMirrored = newFacingMode === 'user';
            webcamRef.current.video.style.transform = isMirrored ? 'scale(-1, 1)' : 'scale(1, 1)';

            // MediaRecorder 다시 초기화
            mediaRecorderRef.current = new MediaRecorder(stream, {
                mimeType: mimeType
            });
            mediaRecorderRef.current.ondataavailable = handleDataAvailable;
            mediaRecorderRef.current.onstop = () => {
                setCapturing(false);
            };

            // 캡쳐 중이면 중지
            if (capturing) {
                handleStopCaptureClick();
            }
        } catch (error) {
            console.error('Error toggling facing mode:', error);
        }
    }, [webcamRef, mediaRecorderRef, mimeType, capturing, handleDataAvailable, handleStopCaptureClick, facingMode]);

    return (
        <span className="WebCamContainer">
            <Webcam
                style={{ height: '100%' }}
                audio={false} //나중에 true 로 바꿔야 오디오도 녹음 됨
                ref={webcamRef}
                mirrored={true}
                videoConstraints={{
                    facingMode: 'user',
                    aspectRatio: window.innerHeight / window.innerWidth,
                    width: window.innerHeight,
                    height: window.innerWidth,
                }}
            />
            <div className='closeWhite'
                onClick={CloseWebCam}>
                {/*  onClick={() => navi("/story")}> */}

                <img alt='backWhite' src={closeW} style={{
                    width: '24px',
                    textShadow: '-6px -6px 12px rgba(73, 73, 73, 0.20), 6px 6px 18px rgba(0, 0, 0, 0.80)'
                }} />
            </div>

            {isMobile && (
                <div className='zoom'>
                    {/* <input className="ZoomControl" id="zoomInput" type="range" min="1" max="10" step="0.1" /> */}
                    {/* Zoom Level: {zoomValue} */}
                    <button
                        className={`zoomBtn zoomhalf primaryButton-inset ${selectedZoomButton === 'zoomhalf' ? 'selected' : ''}`}
                        onClick={() => handleZoomButtonClick(1.0)}>1.0</button>
                    <button
                        className={`zoomBtn zoomnormal primaryButton-inset ${selectedZoomButton === 'zoomnormal' ? 'selected' : ''}`}
                        onClick={() => handleZoomButtonClick(1.5)}>1.5</button>
                    <button
                        className={`zoomBtn zoomdouble primaryButton-inset ${selectedZoomButton === 'zoomdouble' ? 'selected' : ''}`}
                        onClick={() => handleZoomButtonClick(2.0)}>2.0</button>
                </div>
            )}

            {isMobile && (
                <button className='switchCamera' onClick={toggleFacingMode}>
                    <img alt='' src={switchCameraW} style={{ width: '24px' }} />
                </button>
            )}

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