import React, { useEffect, useState } from 'react';

const Map = ({ locations }) => {
    const [map, setMap] = useState(null); // 지도 인스턴스를 저장할 상태
    const [polyline, setPolyline] = useState(null);

    // 현재 위치로 이동하는 함수
    const moveToCurrentLocation = () => {

        if (!map) {
            console.error('지도가 아직 로드되지 않았습니다.');
            return;
        }

        if (locations.length > 0) {

            const currentLocation = locations[locations.length - 1];
            const center = new window.naver.maps.LatLng(currentLocation.latitude, currentLocation.longitude);
            map.setCenter(center);
        } else {
            alert('현재 위치 정보가 없습니다.');
        }
    };


    useEffect(() => {

        // 스크립트 태그가 이미 존재하는지 확인
        const existingScript = document.querySelector('script[src="https://openapi.map.naver.com/openapi/v3/maps.js?ncpClientId=38q1h3iyts"]');
        if (existingScript) return;

        const script = document.createElement('script');
        script.async = true;
        script.src = 'https://openapi.map.naver.com/openapi/v3/maps.js?ncpClientId=38q1h3iyts';
        document.head.appendChild(script);

        script.onload = () => {
            const mapOptions = {
                zoomControl: true, // 확대/축소 컨트롤 활성화
            };

            const newMap = new window.naver.maps.Map('map', mapOptions);
            setMap(newMap);
        };
    }, []);

    useEffect(() => {
        if (!map || locations.length === 0) return;

        // 지도에 버튼 추가
        const locationButton = document.createElement('button');
        locationButton.innerText = '현재 위치로 이동';
        locationButton.style.position = 'absolute';
        locationButton.style.top = '10px';
        locationButton.style.left = '10px';
        locationButton.style.zIndex = 5;
        locationButton.addEventListener('click', moveToCurrentLocation);

        document.getElementById('map').appendChild(locationButton);


        if (polyline) {
            polyline.setMap(null); // 기존 폴리라인 제거
        }

        const latLonPath = locations.map(loc => new window.naver.maps.LatLng(loc.latitude, loc.longitude));
        const newPolyline = new window.naver.maps.Polyline({
            path: latLonPath,
            strokeColor: '#5347AA',
            strokeOpacity: 0.8,
            strokeWeight: 3,
            strokeStyle: 'solid', // 변경 가능: 'solid', 'shortdash', 'shortdot', 'shortdashdot', 등
            strokeLineCap: 'round', // 변경 가능: 'butt', 'round', 'square'
            strokeLineJoin: 'round', // 변경 가능: 'miter', 'round', 'bevel'
            map: map
        });

        setPolyline(newPolyline);


    }, [map, locations]);

    return (
        <div id="map" style={{ width: '100%', height: '400px' }}>
            <button
                onClick={moveToCurrentLocation}
                style={{ position: 'absolute', top: '10px', left: '10px', zIndex: 5 }}
            >
                현재 위치로 이동
            </button>
        </div>
    );
};

export default Map;
