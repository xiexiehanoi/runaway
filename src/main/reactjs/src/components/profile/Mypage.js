import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';
import { Container as MapDiv, NaverMap, Polyline  ,useNavermaps } from 'react-naver-maps'

const Mypage = () => {
    // 위치 데이터 상태 관리
    const [paths, setPaths] = useState([]);
    const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

    useEffect(() => {
        //서버에서 위치 데이터 가져오기

        axios.get(`${BACKEND_URL}/api/profile/map/path`, {
            params: {
                userId: 20
            }
        })
            .then(function (response) {
                // 기존 상태에 새로운 paths 배열을 추가하는 로직
              
                const newPaths = response.data.map(item => item.path);
                setPaths(prevPaths => [...prevPaths, ...newPaths]);

            })
            .catch(function (error) {
                console.log(error);
            })
            .finally(function () {

            });

    }, [])

    
    return (
        <MapDiv
            style={{
                width: '100%',
                height: '200px',
            }}
        >
            <MultipleMapsComponent paths={paths}/>      
        </MapDiv>   
    )
};

function MultipleMapsComponent({ paths }) {
    return (
      <div>
        {paths.map((path, index) => (
          <SingleMapComponent key={index} path={path} />
        ))}
      </div>
    );
  }
  
  function SingleMapComponent({ path }) {
    const navermaps = useNavermaps(); 
    const mapRef = useRef(null);
    
    // 경로의 첫 번째 위치를 지도의 초기 중심으로 사용
    const initialCenter = path.length > 0 ? path[0] : null;
    const polylinePath = path.map(item => new window.naver.maps.LatLng(item.latitude, item.longitude));
  
    useEffect(() => {
      if (initialCenter && mapRef.current) {
        mapRef.current.setCenter(new window.naver.maps.LatLng(initialCenter.latitude, initialCenter.longitude));
      }
    }, [initialCenter, mapRef]);
  
    console.log(polylinePath);
    return (
      <div style={{ width: '100%', height: '400px', marginBottom: '20px' }}>
        <NaverMap
          ref={mapRef}
          style={{ width: '100%', height: '100%' }}
        >
          {path.length > 0 && (
            <Polyline
              path={polylinePath}
              strokeColor="#5347AA"
            />
          )}
        </NaverMap>
      </div>
    );
  }

export default Mypage;