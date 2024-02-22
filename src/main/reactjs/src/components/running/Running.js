import React from 'react';
import RunningMap from "./RunningMap";
import axios from 'axios';
import { RunningLocationTracking } from './RunningLocationTracking';
import './css/Running.css'

function Running() {
    const {
        location,
        startTracking,
        stopTracking,
        distanceTraveled,
        pace,
        initialLocation,
        timer
    } = RunningLocationTracking();

    // 초 단위의 타이머 값을 00:00 형식으로 변환하는 함수
    const formatTime = (time) => {
        const minutes = Math.floor(time / 60).toString().padStart(2, '0');
        const seconds = (time % 60).toString().padStart(2, '0');
        return `${minutes}:${seconds}`;
    };

    const startRun = () => {
        console.log("Function startRun");
        startTracking();
    }

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
                    <div className="distance">{Math.round(distanceTraveled * 1000) / 1000} Km</div>
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
                <button onClick={startRun} className="start-button">▶</button>
                <button onClick={stopRun} className="stop-button">■</button>
            </div>
        </div>
    );
}

export default Running;