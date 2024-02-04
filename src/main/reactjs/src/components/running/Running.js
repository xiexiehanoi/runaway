import React, { useEffect, useState } from 'react';
import RunningMap from "./RunningMap";

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

function Running() {
    const [geoLocationList, setGeoLocationList] = useState([])
    const [initialLocation, setInitialLocation] = useState({})
    const [timer, setTimer] = useState(0); // 타이머를 위한 상태
    const [isRunning, setIsRunning] = useState(false); // 타이머가 실행 중인지 확인하는 상태
    const [intervalId, setIntervalId] = useState(null); // setInterval의 ID를 저장
    const [distance, setDistance] = useState(0)

    // 초 단위의 타이머 값을 00:00 형식으로 변환하는 함수
    const formatTime = (time) => {
        const minutes = Math.floor(time / 60).toString().padStart(2, '0');
        const seconds = (time % 60).toString().padStart(2, '0');
        return `${minutes}:${seconds}`;
    };

    const startRun = () => {
        console.log("Function startRun");
        setGeoLocationList([])

        if (!isRunning) {
            const id = setInterval(() => {
                setTimer(prevTimer => prevTimer + 1); // 1초마다 타이머를 업데이트
            }, 1000);
            setIntervalId(id);
            setIsRunning(true);
        }


        if (window.Android) {
            window.Android.startRun();
        }
    }

    const stopRun = () => {
        console.log("Function stopRun");


        if (isRunning) {
            clearInterval(intervalId); // 타이머 멈춤
            setIsRunning(false);
        }


        if (window.Android) {
            window.Android.stopRun();
        }
    }

    const resetRun = () => {
       
        if (isRunning) {
            clearInterval(intervalId);
            setIsRunning(false);
            setTimer(0);
        }else{
            setTimer(0);
        }
        
    };

    function onNavigatorCallback(pos) {
        const latitude = pos.coords.latitude;
        const longitude = pos.coords.longitude;

        setInitialLocation({ latitude, longitude })
    }

    useEffect(() => {
        if (geoLocationList.length <= 1) return;
        const R = 6371;
        const toRad = (value) => (value * Math.PI) / 180;
        const {latitude: lat1, longitude: lon1} = geoLocationList[geoLocationList.length -1]
        const {latitude: lat2, longitude: lon2} = geoLocationList[geoLocationList.length -2]

        const dLat = toRad(lat2 - lat1);
        const dLon = toRad(lon2 - lon1);
        const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) + Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        const tmpDistance = R * c;

        setDistance(distance + tmpDistance)        
    }, [geoLocationList])


    useEffect(() => {
        if (navigator.geolocation) {
            navigator.permissions.query({ name: "geolocation" })
                .then(function (result) {
                    console.log(result)
                    if (result.state === "granted") {
                        navigator.geolocation.getCurrentPosition(onNavigatorCallback, null, null);
                    }
                    else if (result.state === "prompt") {
                        navigator.geolocation.getCurrentPosition(onNavigatorCallback, null, null);
                    }
                })
        }
        else {
            console.log("Geolocation is not supported by this browser.");
        }

        const handleGeoLocationCallback = (e) => {
            let obj = JSON.parse(e.detail)
            let latitude = obj["latitude"]
            let longitude = obj["longitude"]
            setGeoLocationList(prevList => [...prevList, { latitude, longitude }]);
        };

        window.addEventListener("onGeoLocationCallback", handleGeoLocationCallback);

        return () => {
            window.removeEventListener("onGeoLocationCallback", handleGeoLocationCallback);
        };
    }, []);

    const handleMockDataClick = () => {
        const totalMockDataCount = MockDataList.length;
        let currentCount = 0;

        const addMockDataWithDelay = () => {
            if (currentCount < totalMockDataCount) {
                const newMockData = generateMockData(currentCount);
                setGeoLocationList((prevList) => [...prevList, newMockData]);

                currentCount++;
                setTimeout(addMockDataWithDelay, 5000);
            }
        };

        addMockDataWithDelay();
    };



    return (
        <div>
            Running

            <button onClick={startRun}>Start Run</button>
            <button onClick={stopRun}>Stop Run</button>
            <button onClick={resetRun}>Reset Run</button> 
            <button onClick={handleMockDataClick}>Mock Data</button>

            <div>
                <RunningMap path={geoLocationList} initialLocation={initialLocation} />
            </div>
            <div>
                시간: {formatTime(timer)}
            </div>
            <div>
                거리 : {Math.round(distance * 1000) / 1000 } Km
            </div>
        </div>
    );
}

export default Running;