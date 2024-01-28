import React, {useEffect, useState} from 'react';

function startRun() {
    if (window.Android) {
        console.log("Function startRun");
        window.Android.startRun();
    }
}

function stopRun() {
    if (window.Android) {
        console.log("Function stopRun");
        window.Android.stopRun();
    }
}

function Running() {
    const [geoLocationList, setGeoLocationList] = useState([]);

    useEffect(() => {
        startRun();

        const handleGeoLocationCallback = (e) => {
            let obj = JSON.parse(e.detail)
            let latitude = obj["latitude"]
            let longitude = obj["longitude"]
            setGeoLocationList(prevList => [...prevList, { latitude, longitude }]);
        };

        window.addEventListener("onGeoLocationCallback", handleGeoLocationCallback);

        return () => {
            stopRun();
            window.removeEventListener("onGeoLocationCallback", handleGeoLocationCallback);
        };
    }, []);

    return (
        <div>
            Running
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