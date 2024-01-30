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

function Running() {
    const [geoLocationList, setGeoLocationList] = useState([]);
    const isTracking = useState(false);

    useEffect(() => {
        //startRun();

        const handleGeoLocationCallback = (e) => {
            let obj = JSON.parse(e.detail)
            let latitude = obj["latitude"]
            let longitude = obj["longitude"]
            setGeoLocationList(prevList => [...prevList, { latitude, longitude }]);
        };

        window.addEventListener("onGeoLocationCallback", handleGeoLocationCallback);

        return () => {
            //stopRun();
            window.removeEventListener("onGeoLocationCallback", handleGeoLocationCallback);
        };
    }, []);

    return (
        <div>
            Running
            <button onClick={startRun}>Start Run</button>
            <button onClick={stopRun}>Stop Run</button>
            <button onClick={stopRun}>Mock Data</button> {/* TODO: Make Mock */}

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