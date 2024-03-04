import React, { useCallback, useEffect, useRef, useState } from 'react';
import Webcam from 'react-webcam';
import WebCamTimer from './WebCamTimer';
import axios from 'axios';
import closeW from '../../image/close-white.png';
import switchCameraW from '../../image/switchCameraW.png';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';


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
    const [selectedZoomButton, setSelectedZoomButton] = useState(1.5); // 선택된 줌 버튼
    const [isMobile, setIsMobile] = useState(false); // 추가: 모바일 여부 상태
    const [facingMode, setFacingMode] = useState('user'); // 카메라 방향 상태 추가

    const BASE_URI = process.env.REACT_APP_BACKEND_URL;
    const token = window.localStorage.getItem("token");
    const navi = useNavigate();

    useEffect(() => {
        const isDeviceMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
        setIsMobile(isDeviceMobile);
    }, []);

    const handleDataAvailable = useCallback(({ data }) => {
        console.log("Data Available:", data);
        if (data.size > 0) {
            // setRecordedChunks((prev) => prev.concat(data));
            setRecordedChunks((prev) => [...prev, data]);
        }
    }, [setRecordedChunks]);



    useEffect(() => {
        const startWebcam = async () => {
            try {
                const devices = await navigator.mediaDevices.enumerateDevices();
                const videoInputDevices = devices.filter((device) => device.kind === 'videoinput');

                if (videoInputDevices.length === 0) {
                    alert('해당 기기에 카메라가 발견되지 않았습니다. 카메라를 연결해주세요.');
                    return;
                }


                if (webcamRef.current && webcamRef.current.video && webcamRef.current.video.srcObject) {
                    const stream = webcamRef.current.video.srcObject;

                    // 모바일 브라우저에서 지원되는 MIME 유형 확인
                    const supportedMimeTypes = MediaRecorder.getSupportedMimeTypes();
                    console.log("Supported MIME types:", supportedMimeTypes);

                    let mimeType = 'video/webm'; // 기본값 설정

                    // 모바일 브라우저에서 지원되는 MIME 유형 중 하나를 선택
                    if (!supportedMimeTypes.includes(mimeType)) {
                        mimeType = supportedMimeTypes.find(type => type.startsWith('video/'));
                    }

                    setMimeType(mimeType);

                    // let type = 'video/webm';
                    // if (!MediaRecorder.isTypeSupported(type)) {
                    //     type = 'video/mp4';
                    //     if (!MediaRecorder.isTypeSupported(type)) {
                    //         alert('모바일 브라우저에서 지원되지 않는 mimeType입니다.');
                    //         return;
                    //     }
                    // }
                    // setMimeType(type);

                    // let mimeType = MediaRecorder.isTypeSupported('video/webm') ? 'video/webm' : 'video/mp4'; // MIME 유형 동적으로 결정
                    // mediaRecorderRef.current = new MediaRecorder(webcamRef.current.stream, {
                    mediaRecorderRef.current = new MediaRecorder(stream, {
                        // mimeType: "video/mp4"
                        mimeType: mimeType
                    });

                    mediaRecorderRef.current.ondataavailable = handleDataAvailable;

                    mediaRecorderRef.current.onstop = () => {
                        // Handle the stop event if needed
                        setCapturing(false);
                    };

                }
            } catch (error) {
                alert(error);
                console.error('Error initializing media recorder:', error);
            }
        };

        startWebcam();
    }, [webcamRef, mediaRecorderRef, handleDataAvailable]);

    const handleStopCaptureClick = useCallback(() => {
        if (mediaRecorderRef.current && mediaRecorderRef.current.state === "recording") {
            mediaRecorderRef.current.stop();
            clearInterval(timer); // 타이머 멈춤
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
                // mimeType: "video/webm" // 변경
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

    const handleUpload = useCallback(async () => {
        if (recordedChunks.length) {
            try {
                const blob = new Blob(recordedChunks, {
                    type: mimeType
                });
                const uploadVideo = new FormData();

                // uploadVideo.append('upload', blob, 'runaway-story.mp4');
                uploadVideo.append('upload', blob, `runaway-story.mp4`);

                const res = await axios.post(`${BASE_URI}/api/story/save`, uploadVideo, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        Authorization: token
                    }
                });

                console.log("Story Uploaded successfully:", res.data);
                alert("Story Uploaded successfully");

                // 파일 업로드가 성공하면 페이지를 이동합니다.
                navi('/story');
            } catch (error) {
                alert(error);
                console.error("Error uploading file:", error);
            }
        }
    }, [recordedChunks, mimeType, BASE_URI, token, navi]);

    const CloseWebCam = useCallback(() => {
        Swal.fire({
            icon: "warning",
            title: '정말로 나가시겠습니까?',
            confirmButtonText: "네, 나가겠습니다",
            cancelButtonText: "아니요, 돌아가겠습니다",
            showCancelButton: true,
            customClass: {
                confirmButton: 'sa2-confirm-button-class',
                cancelButton: 'sa2-cancel-button-class',
                title: 'sa2-title-class',
                icon: 'sa2-icon-class',
                popup: 'sa2-popup-class',
                container: 'sa2-container-class'
            },
            html: "이대로 나가신다면<br/>'Upload Story'를 통해<br/>업로드하지 않은 영상들은<br/>지워질 수 있습니다 "

        }).then(result => {
            if (result.isConfirmed) {
                // Swal.fire(
                navi('/story')
                // );
            } else {
            }
        });
        // navi('/story'); // 페이지 이동
    }, [navi]);

    const handleZoomButtonClick = useCallback((value) => {
        setZoomValue(value);
        setSelectedZoomButton(value);

        // 줌 값을 변경할 때마다 웹캠에 반영
        const zoomInput = value; // 줌 값에 10을 곱해서 0.1 단위로 설정

        const isMirrored = facingMode === 'user';
        const transformValue = isMirrored ? `scale(-${zoomInput}, ${zoomInput})` : `scale(${zoomInput}, ${zoomInput})`;
        // webcamRef.current.video.style.transform = `scale(${zoomInput})`;
        webcamRef.current.video.style.transform = transformValue;

        alert(zoomValue);

        // alert(value); // 버튼 클릭 시 값을 확인하기 위해 alert 추가
    }, [webcamRef, facingMode, zoomValue]);


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
            alert(error);
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


            <div className='zoom'>
                <button
                    className={`zoomBtn zoomhalf primaryButton-inset`}
                    style={{ border: `${selectedZoomButton === 1.0 ? ' 2px solid gold' : 'none'}` }}
                    onClick={() => handleZoomButtonClick(1.0)}>1.0</button>
                <button
                    className={`zoomBtn zoomnormal primaryButton-inset`}
                    style={{ border: `${selectedZoomButton === 1.5 ? '2px solid gold' : 'none'}` }}
                    onClick={() => handleZoomButtonClick(1.5)}>1.5</button>
                <button
                    className={`zoomBtn zoomdouble primaryButton-inset`}
                    style={{ border: `${selectedZoomButton === 2.0 ? '2px solid gold' : 'none'}` }}
                    onClick={() => handleZoomButtonClick(2.0)}>2.0</button>
            </div>


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
                <button className="WebCamVideoUploadBtn" onClick={handleUpload}>Upload Story</button>
            )}
            <WebCamTimer elapsedTime={elapsedTime} />
        </span>
    );
};

export default WebCamVideo;