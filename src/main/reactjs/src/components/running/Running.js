import React from 'react';
import RunningMap from "./RunningMap";
import axios from 'axios';
import {RunningLocationTracking} from './RunningLocationTracking';

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

        // 현재 날짜와 시간 얻기
        const now = new Date();
        const formattedDate = now.toLocaleDateString('ko-KR'); // '년/월/일' 형식으로 날짜 포맷
        const formattedTime = now.toLocaleTimeString('ko-KR', { hour: '2-digit', minute: '2-digit' }); // '시:분' 형식으로 시간 포맷

        const BASE_URI = process.env.REACT_APP_BASE_URI;
        axios.post(`${BASE_URI}/api/running/save`,{
            userIdx:1,
            date:formattedDate,
            time:formattedTime,
            distance :Math.round(distanceTraveled * 1000) / 1000 ,
            averagePace:pace,
            runningTime:formatTime(timer),
            path:location

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
        <div>
            Running

            <button onClick={startRun}>Start Run</button>
            <button onClick={stopRun}>Stop Run</button>
            {/*<button onClick={handleMockDataClick}>Mock Data</button>*/}

            <div>
                <RunningMap path={location} initialLocation={initialLocation} />
            </div>
            <div>
                시간: {formatTime(timer)}
            </div>
            <div>
                거리 : {Math.round(distanceTraveled*1000)/1000} Km
            </div>
            <div>
                pace:  {pace}
            </div>

        </div>
    );
}

export default Running;