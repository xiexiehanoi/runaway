import React, { useState } from 'react';
import RunningMap from "./RunningMap";
import axios from 'axios';
import { RunningLocationTracking } from './RunningLocationTracking';
import '../../CSS/Running.css'
import { useNavigate } from 'react-router-dom';

function Running() {
    const {
        location,
        startTracking,
        stopTracking,
        pauseTracking,
        running,
        distanceTraveled,
        pace,
        initialLocation,
        timer
    } = RunningLocationTracking();

    // 추가된 상태 관리 로직
    const [isPlaying, setIsPlaying] = useState(false); // 재생 상태


    const [time, setTimer] = useState(null);
    const [alertTimer, setAlertTimer] = useState(null);
    const [showAlert, setShowAlert] = useState(false);
    let navigate = useNavigate();

    const handleMouseDown = () => {
        // 3초 후 기록 종료
        const timeout = setTimeout(() => {
            stopRun(); // 여기에 기록 종료 및 페이지 이동 로직 포함
            navigate('/home');
        }, 3000);
        setTimer(timeout);
    };

    const handleMouseUp = () => {

        // 알림 표시
        setShowAlert(true);
        // 2초 후 알림 사라짐
        const alertTimeout = setTimeout(() => setShowAlert(false), 2000);
        setAlertTimer(alertTimeout);
        // 타이머 취소
        clearTimeout(time);
    };

    const handleTouchDown = (event) => {
        event.preventDefault(); // 브라우저의 기본 동작 방지
        // 3초 후 기록 종료
        const timeout = setTimeout(() => {
            stopRun(); // 여기에 기록 종료 및 페이지 이동 로직 포함
            navigate('/home');
        }, 3000);
        setTimer(timeout);

    };

    const handleTouchUp = (event) => {
        event.preventDefault();
        // 알림 표시
        setShowAlert(true);
        // 2초 후 알림 사라짐
        const alertTimeout = setTimeout(() => setShowAlert(false), 2000);
        setAlertTimer(alertTimeout);
        // 타이머 취소
        clearTimeout(time);
        event.preventDefault()
    };








    // 초 단위의 타이머 값을 00:00 형식으로 변환하는 함수
    const formatTime = (time) => {
        const minutes = Math.floor(time / 60).toString().padStart(2, '0');
        const seconds = (time % 60).toString().padStart(2, '0');
        return `${minutes}:${seconds}`;
    };

    // 재생/일시정지 버튼 클릭 이벤트 핸들러
    const togglePlayPause = () => {
        setIsPlaying(!isPlaying);
        if (!isPlaying) {
            startTracking();
        } else {
            pauseTracking();
        }
    };



    const stopRun = () => {
        console.log("Function stopRun");
        stopTracking();

        if (distanceTraveled === 0) return;

        // 현재 날짜와 시간을 얻기
        const now = new Date();
        // 한국 시간대로 조정 (UTC+9)
        const kstDate = new Date(now.getTime() + (9 * 60 * 60 * 1000));
        // ISO-8601 형식의 날짜 문자열 생성 ('YYYY-MM-DD')
        const formattedDate = kstDate.toISOString().split('T')[0];
        // ISO-8601 형식의 시간 문자열 생성 ('HH:MM:SS'), 초 단위는 제외하려면 substring 사용
        const formattedTime = kstDate.toISOString().split('T')[1].substring(0, 5);

        const token = window.localStorage.getItem('token');
        if (!token) {
            console.log("token not found")
            return;
        }

        const timeMin = timer / 60;
        const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
        axios.post(`${BACKEND_URL}/api/running/save`, {
            date: formattedDate,
            time: formattedTime,
            distance: Math.round(distanceTraveled * 1000) / 1000,
            averagePace: pace,
            runningTime: formatTime(timer),
            path: location
        }, {
            headers: {
                Authorization: token
            }
        })
            .then(function (response) {
                console.log(response);
            })
            .catch(function (error) {
                console.log(error);
            });


    }

    return (
        <div className="running-container">
            <div className="map-view">
                <RunningMap path={location} initialLocation={initialLocation} />
            </div>
            <div className="stats-container">
                <div className="stats-distance">
                    <div className="distance">{Math.round(distanceTraveled * 100) / 100} km</div>
                    <div className="label">킬로미터</div>
                </div>
                <div className="stats-pace">
                    <div className="pace">{pace}</div>
                    <div className="label">평균 페이스</div>
                </div>
                <div className="stats-time">
                    <div className="time">{formatTime(timer)}</div>
                    <div className="label">시간</div>
                </div>
            </div>
            <div className="control-buttons">
                <div className="circle">
                    <span className={`circle__btn ${isPlaying ? 'shadow' : ''}`} onClick={togglePlayPause} style={{ marginRight: '90px' }}>
                        {/* isPlaying이 true이면 pause 아이콘이 보이고, false이면 숨겨짐 */}
                        {isPlaying ? (
                            <ion-icon className="pause visibility" name="pause" style={{ fontSize: '34px' }}></ion-icon>
                        ) : (
                            // isPlaying이 false이면 play 아이콘이 보이고, true이면 숨겨짐
                            <ion-icon className="play visibility" name="play" style={{ marginLeft: '8px', fontSize: '32px' }}></ion-icon>
                        )}
                    </span>
                    {/* 정지 버튼 */}
                    {showAlert && <div id="alert-box" class="alert">
                        <span class="alert-icon"><i class="fas fa-hand-pointer"></i></span>
                        <span class="alert-text">정지 버튼을 길게 누르면<br /> 러닝이 중단됩니다</span>
                    </div>}
                    <span className="circle__btn stop-btn" onTouchStart={handleTouchDown} onTouchEnd={handleTouchUp} onMouseDown={handleMouseDown} onMouseUp={handleMouseUp} style={{ marginLeft: '200px' }}>
                        <ion-icon name="stop" style={{ fontSize: '34px' }}></ion-icon>
                    </span>
                    <span className={`circle__back-1 ${isPlaying ? '' : 'paused'}`} style={{ marginRight: '80px' }}></span>
                    <span className={`circle__back-2 ${isPlaying ? '' : 'paused'}`} style={{ marginRight: '80px' }}></span>
                </div>
                {/* <button onClick={stopRun} className="stop-button">■</button> */}
            </div>
        </div>
    );
}

export default Running;