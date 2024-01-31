import React, { useEffect } from 'react';

const Map = ({ locations }) => {
    let map = null;

    useEffect(() => {
        const script = document.createElement('script');
        script.async = true;
        script.src = 'https://openapi.map.naver.com/openapi/v3/maps.js?ncpClientId=38q1h3iyts';
        document.head.appendChild(script);

        script.onload = () => {
            const mapOptions = {
                zoomControl: true, // 확대/축소 컨트롤 활성화
            };

            map = new window.naver.maps.Map('map', mapOptions);
        };
    }, []);

    useEffect(() => {
        if (!map) return;

        const initialPath = locations.map(loc => new window.naver.maps.LatLng(loc.latitude, loc.longitude));
        new window.naver.maps.Polyline({
            path: initialPath,
            strokeColor: '#5347AA',
            strokeOpacity: 0.8,
            strokeWeight: 3,
            map: map
        });

    }, [locations]);

    return <div id="map" style={{ width: '100%', height: '400px' }}></div>;
};

export default Map;
