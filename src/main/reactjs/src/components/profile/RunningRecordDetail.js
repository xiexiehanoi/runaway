
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Container as MapDiv, NaverMap, Polyline } from 'react-naver-maps'
import './css/RunningRecordDetail.css'; // Ensure the CSS path is correct

function RunningRecordDetail() {
    let { runIdx } = useParams();
    const [detail, setDetail] = useState(null);
    const [path, setPath] = useState([]);
    const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

    const polylinePath = path.map(item => ({
        lat: item.latitude,
        lng: item.longitude
    }));
    const initialCenter = polylinePath.length > 0 ? polylinePath[0] : { lat: 37.3595704, lng: 127.105399 };

    useEffect(() => {
        axios.get(`${BACKEND_URL}/api/profile/running/detail`, {
            params: { runIdx: runIdx }
        })
        .then(response => {
            setDetail(response.data);
            setPath(response.data.path);
        })
        .catch(error => {
            console.error(error);
        });
    }, [runIdx, BACKEND_URL]);

    return (
        <div className='record-container'>
            <div className='record-header'>
                <h1 className='record-distance'>{detail?.distance}</h1>
                <div className='record-stats'>
                    <div className='record-pace'>
                        <span className='record-label'>페이스</span>
                        <span className='record-value'>{detail?.pace}</span>
                    </div>
                    <div className='record-time'>
                        <span className='record-label'>시간</span>
                        <span className='record-value'>{detail?.runningTime}</span>
                    </div>
                    <div className='record-calories'>
                        <span className='record-label'>칼로리</span>
                        <span className='record-value'>{detail?.calorie}</span>
                    </div>
                </div>
            </div>
            <div className='map-container'>
                <MapDiv className='map-container'>
                <NaverMap
                    center={initialCenter}
                    style={{ width: '100%', height: '100%' }} // CSS class handles dimensions
                >
                    {path.length > 0 && (
                        <Polyline
                            path={polylinePath}
                            strokeColor="#5347AA"
                            strokeWeight={5} // Optional: Adjust line thickness
                            startIcon={window.naver.maps.PointingIcon ? window.naver.maps.PointingIcon.CIRCLE : null}
                            endIcon={window.naver.maps.PointingIcon ? window.naver.maps.PointingIcon.OPEN_ARROW : null}

                        />
                    )}
                </NaverMap>
            </MapDiv>

            </div>
        </div>
    );
}

export default RunningRecordDetail;
