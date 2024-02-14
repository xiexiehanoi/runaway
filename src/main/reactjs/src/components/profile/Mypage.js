import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';
import { Container as MapDiv, NaverMap, Polyline  ,useNavermaps } from 'react-naver-maps'

const Mypage = () => {
  const [paths, setPaths] = useState([]);
  const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

  useEffect(() => {
      axios.get(`${BACKEND_URL}/api/profile/map/path`, {
          params: { userId: 20 }
      })
      .then(function (response) {
          const newPaths = response.data.map(item => item.path);
          setPaths(prevPaths => [...prevPaths, ...newPaths]);
      })
      .catch(function (error) {
          console.log(error);
      });
  }, []);

  return (
      <div style={{ width: '100%', height: '100px' }}>
          {paths.map((path, index) => (
            <MapDiv>
              <SingleMapComponent key={index} path={path} id={`map-${index}`} />
              </MapDiv>
          ))}
      </div>   
  );
};

function SingleMapComponent({ path, id }) {
  const navermaps = useNavermaps(); // 이 함수의 구체적인 사용법은 라이브러리 문서 참조
  const mapRef = useRef(null);
  const initialCenter = path.length > 0 ? path[0] : null;
  const polylinePath = path.map(item => new navermaps.LatLng(item.latitude, item.longitude));

  useEffect(() => {
    if (initialCenter && mapRef.current) {
      mapRef.current.setCenter(new navermaps.LatLng(initialCenter.latitude, initialCenter.longitude));
    }
  }, [initialCenter, mapRef]);

  return (
      <div style={{ width: '100%', height: '100px', marginBottom: '20px' }} id={id}>
          <NaverMap
            ref={mapRef}
            style={{ width: '100%', height: '100px' }}
            mapDivId={id} // `mapDivId` prop 사용하여 고유한 컨테이너에 지도를 렌더링
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