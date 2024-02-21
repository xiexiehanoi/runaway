import React from 'react';
import RunningMap from "./RunningMap";
import axios from 'axios';
import { RunningLocationTracking } from './RunningLocationTracking';
import './css/Running.css'
/*

const MockDataList = [
    { latitude: 37.359924641705476, longitude: 127.1148204803467 },
    { latitude: 37.36343797188166, longitude: 127.11486339569092 },
    { latitude: 37.368520071054576, longitude: 127.11473464965819 },
    { latitude: 37.3685882848096, longitude: 127.1088123321533 },
    { latitude: 37.37295383612657, longitude: 127.10876941680907 },
    { latitude: 37.38001321351567, longitude: 127.11851119995116 },
    { latitude: 37.378546827477855, longitude: 127.11984157562254 },
    { latitude: 37.376637072444105, longitude: 127.12052822113036 },
    { latitude: 37.37530703574853, longitude: 127.12190151214598 },
    { latitude: 37.371657839593894, longitude: 127.11645126342773 },
    { latitude: 37.36855417793982, longitude: 127.1207857131958 },
];

function generateMockData(count) {
    console.log(MockDataList.length);
    if (count < MockDataList.length) {
        return MockDataList[count]
    }
    else {
        return {}
    }
}
*/

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

    /*
        const handleMockDataClick = () => {
            const totalMockDataCount = MockDataList.length;
            let currentCount = 0;
    
            const addMockDataWithDelay = () => {
                if (currentCount < totalMockDataCount) {
                    const newMockData = generateMockData(currentCount);
                    setLocation((prevList) => [...prevList, newMockData]);
    
                    currentCount++;
                    setTimeout(addMockDataWithDelay, 5000);
                }
            };
            
            addMockDataWithDelay();
        };
    */

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