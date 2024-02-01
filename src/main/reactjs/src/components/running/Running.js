import React, {useEffect, useState} from 'react';
import RunningMap from "./RunningMap";

const MockDataList = [
    {latitude: 37.359924641705476, longitude: 127.1148204803467},
    {latitude: 37.36343797188166, longitude: 127.11486339569092},
    {latitude: 37.368520071054576, longitude: 127.11473464965819},
    {latitude: 37.3685882848096, longitude: 127.1088123321533},
    {latitude: 37.37295383612657, longitude: 127.10876941680907},
    {latitude: 37.38001321351567, longitude: 127.11851119995116},
    {latitude: 37.378546827477855, longitude: 127.11984157562254},
    {latitude: 37.376637072444105, longitude: 127.12052822113036},
    {latitude: 37.37530703574853, longitude: 127.12190151214598},
    {latitude: 37.371657839593894, longitude: 127.11645126342773},
    {latitude: 37.36855417793982, longitude: 127.1207857131958},
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
    const [geoLocationList, setGeoLocationList] = useState([]);

    const startRun = () => {
        console.log("Function startRun");
        setGeoLocationList([])

        if (window.Android) {
            window.Android.startRun();
        }
    }

    const stopRun = () => {
        console.log("Function stopRun");

        if (window.Android) {
            window.Android.stopRun();
        }
    }
    

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
            <button onClick={handleMockDataClick}>Mock Data</button>

            <div>
                <RunningMap path={geoLocationList}/>      
            </div>

        </div>
    );
}

export default Running;