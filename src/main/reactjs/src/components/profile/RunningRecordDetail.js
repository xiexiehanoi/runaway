
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Container as MapDiv, NaverMap, Polyline } from 'react-naver-maps'
import './css/RunningRecordDetail.css'; // Ensure the CSS path is correct
import ScreenHeader from "../../router/ScreenHeader";

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
                  setPath(response.data.path);
                  setDetail(response.data); // axios는 자동으로 응답을 JSON으로 파싱합니다.
            })
            .catch(error => {
                console.error(error);
            });
    }, [runIdx, BACKEND_URL]);

    const getDayName = (date) => {
        if (!date) {
            return ''; 
          }
        const dayNames = ['일요일', '월요일', '화요일', '수요일', '목요일', '금요일', '토요일'];
        return dayNames[new Date(date).getDay()];
      };

      // 오전/오후 판단을 위한 함수
      const getMeridiem = (time) => {
        if (!time) {
            return ''; 
          }
        const hour = parseInt(time.split(':')[0], 10);
        return hour < 12 ? '오전' : '오후';
      };


    console.log(detail);
    return (
        <div className='record-container'>
            <div><ScreenHeader title={"Detail"} /></div>
            <div className="record-full-date" style={{marginTop:'30px' , marginBottom:'20px', marginLeft:'20px', fontSize:'13px'}}>
                      {`${new Date(detail?.date).getFullYear()}년 ${new Date(detail?.date).getMonth() + 1}월 ${new Date(detail?.date).getDate()}일 ${getDayName(detail?.date)} ${getMeridiem(detail?.time)}` }
            </div>
            <hr/>
            <div className="running-records-detail">
            <div className="total-distance" style={{marginLeft:'20px'}}>
              <div className="number">{detail?.distance}</div>
              <span className="label">킬로미터</span>
            </div>
            <div className="runningstats-container">
              <div className="stat">
                <span className="number">{detail?.averagePace}</span><br />
                <span className="label">평균 페이스</span>
              </div>
              <div className="stat">
                <span className="number">{detail?.calorie}</span><br />
                <span className="label">칼로리</span>
              </div>
              <div className="stat">
                <span className="number">{detail?.runningTime}</span><br />
                <span className="label">시간</span>
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
