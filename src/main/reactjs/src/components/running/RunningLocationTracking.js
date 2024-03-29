import {useState, useEffect, useRef} from 'react';


function calculateDistance(lat1, lon1, lat2, lon2) {
    const R = 6371;
    const toRad = (value) => (value * Math.PI) / 180;

    const dLat = toRad(lat2 - lat1);
    const dLon = toRad(lon2 - lon1);
    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) + Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c;

    return distance
}


export function RunningLocationTracking() {
    const [location, setLocation] = useState([]);
    const isRunning= useRef(false);
    const [watchID, setWatchID] = useState(null);
    const [intervalId, setIntervalId] = useState(null); // setInterval의 ID를 저장
    const [distanceTraveled, setDistanceTraveled] = useState(0);
    const [newLocation, setNewLocation] = useState(null);
    const [initialLocation, setInitialLocation] = useState({})

    const [timer, setTimer] = useState(0); // 타이머를 위한 상태
    const [pace, setPace] = useState("");
    const running=isRunning.current;

    useEffect(() => {
        const watchId = navigator.geolocation.watchPosition(
            (position) => {
                const { latitude, longitude } = position.coords;
                setNewLocation({ latitude, longitude });
            },
            (error) => {
                console.error('Error getting location:', error);
            }
        );
        setWatchID(watchId);

        return () => {
            if (watchID) {
                navigator.geolocation.clearWatch(watchID);
                setWatchID(null);
            }
        }
    }, [isRunning]);

    useEffect(() => {
        if (isRunning.current && newLocation !== null) {
            setLocation((prevList) => [...prevList, newLocation]);
        }
        else {
            setInitialLocation(newLocation);
        }
    }, [isRunning, newLocation]);

    const startTracking = () => {
        if (isRunning.current) return;
        if (!navigator.geolocation) {
            console.error('Geolocation is not supported by this browser or is already running.');
            return;
        }

        if (newLocation === null) {
            alert("위치 권한을 확인해주세요.");
            return;
        }
        isRunning.current = true;
        setLocation([newLocation]);

        const timerId = setInterval(() => {
            setTimer(prevTimer => prevTimer + 1); // 1초마다 타이머를 업데이트
        }, 1000);
        setIntervalId(timerId);
    };

    const pauseTracking =()=>{
        isRunning.current = false;
        clearInterval(intervalId); // 타이머 멈춤
    }

    const stopTracking = () => {
        isRunning.current = false;
        clearInterval(intervalId); // 타이머 멈춤
    };

    useEffect(() => {
        if (!isRunning.current) return;
        if (location.length < 2) return;
        const distance = calculateDistance(
            location[location.length - 2].latitude,
            location[location.length - 2].longitude,
            location[location.length - 1].latitude,
            location[location.length - 1].longitude
        );

        setDistanceTraveled((prevDistance) => prevDistance + distance);
    }, [location]);

    useEffect(() => {
        if (distanceTraveled > 0) {
            const averagePaceMinutes = (timer / distanceTraveled) / 60; // 총 시간(분)을 총 거리(km)로 나눔
            const paceMinutes = Math.floor(averagePaceMinutes); // 평균 페이스의 분 부분
            const paceSeconds = Math.round((averagePaceMinutes - paceMinutes) * 60); // 평균 페이스의 초 부분
            setPace(`${paceMinutes}'${paceSeconds}''`);
        }
        else {
            setPace(`00'00''`);
        }

    }, [distanceTraveled]);

    return { location, startTracking, stopTracking,pauseTracking,running,distanceTraveled, pace, initialLocation, timer };
}