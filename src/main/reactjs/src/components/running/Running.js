import React, {useEffect, useState} from 'react';

function startRun() {
    console.log("Function startRun");
    if (window.Android) {
        window.Android.startRun();
    }
}

function stopRun() {
    console.log("Function stopRun");

    if (window.Android) {
        window.Android.stopRun();
    }
}

function generateMockData(count) {
    const lastLatitude = 37.7749 + count * 0.1;
    const lastLongitude = -122.4194 - count * 0.1;

    return {
        latitude: lastLatitude,
        longitude: lastLongitude,
    };
}

function Running() {
    const [geoLocationList, setGeoLocationList] = useState([]);

    useEffect(() => {
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
        const totalMockDataCount = 30;
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
            <button onClick={handleMockDataClick}>Mock Data</button>

            <ul>
                {geoLocationList.map((location, index) => (
                    <li key={index}>
                        위도: {location.latitude}, 경도: {location.longitude}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default Running;