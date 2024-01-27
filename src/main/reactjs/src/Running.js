import React, {useEffect, useState} from 'react';

function getGeoLocation() {
    if (window.Android) {
        window.Android.getGeoLocation();
    }
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

    useEffect(() => {
        const intervalId = setInterval(() => {
            getGeoLocation();
            console.log("Function called every 1 second");
        }, 1000);
        return () => clearInterval(intervalId);
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