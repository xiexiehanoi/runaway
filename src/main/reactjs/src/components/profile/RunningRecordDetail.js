
import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Container as MapDiv, NaverMap, Polyline, useNavermaps } from 'react-naver-maps'

function RunningRecordDetail() {
    let { runIdx } = useParams();
    const [detail, setDetail] = useState(null);
    const [path, setPath] = useState([]);
    const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
    const polylinePath = path.map(item => new window.naver.maps.LatLng(item.latitude, item.longitude));
    const initialCenter = polylinePath.length > 0 ? polylinePath[0] : null;
    useEffect(() => {
        // runIdx를 사용하여 세부 정보를 불러오는 API 호출
        axios.get(`${BACKEND_URL}/api/profile/running/detail`, {
            params: { runIdx: runIdx }
        })
            .then(response => {
                console.log(response.data.path)
                setDetail(response.data);
                setPath(response.data.path)
            })
            .catch(error => {
                console.error(error);
            });
    }, [runIdx]);

    return (
        <div>
            
            <MapDiv
            style={{
                width: '100%',
                height: '150px',
              }}>
                <NaverMap
                    center={initialCenter}
                >
                    {path.length > 0 && (
                        <Polyline
                            path={polylinePath}
                            strokeColor="#5347AA"
                        />
                    )}
                </NaverMap>
                </MapDiv>
    
            {detail && ( // detail이 존재할 때만 렌더링
            <div style={{ padding: '10px' }}>
                <h2>러닝기록</h2>
                <p>날짜: {detail.date}</p>
                <p>거리: {detail.distance} km</p>
                <p>시간: {detail.runningTime}</p>
                <p>칼로리: {detail.calorie}</p>
            </div>)}
        </div>
    );
}


export default RunningRecordDetail;




