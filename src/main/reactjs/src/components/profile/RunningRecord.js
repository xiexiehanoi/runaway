import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './css/RunningRecord.css'
import defaultImage from './Img/default-img.jpg';
function RunningRecord(props) {
    const [runningRecord, setRunningRecord] = useState([]);
    const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

    useEffect(() => {
        const token = window.localStorage.getItem('token');
        if (!token) {
            console.log("token not found")
            return;
        }
        

        axios.get(`${BACKEND_URL}/api/profile/running/record`, {
            headers: {
                Authorization: token
            }
        })
            .then(function (response) {
                // 데이터 변환을 위한 함수
                console.log(response.data)
                const getDayName = (date) => {
                    const dayNames = ['일요일', '월요일', '화요일', '수요일', '목요일', '금요일', '토요일'];
                    return dayNames[new Date(date).getDay()];
                };

                // 오전/오후 판단을 위한 함수
                const getMeridiem = (time) => {
                    const hour = parseInt(time.split(':')[0], 10);
                    return hour < 12 ? '오전' : '오후';
                };

                // 데이터를 변환하여 새로운 배열을 만듭니다.
                const formattedData = response.data.map(item => ({
                    ...item,
                    dayName: getDayName(item.date), // 요일
                    meridiem: getMeridiem(item.time), // 오전/오후
                }));

                setRunningRecord(formattedData);
            })
            .catch(function (error) {
                console.error(error);
            });
    }, []);

    return (
        <div className="running-record-container">
            {runningRecord.map((item, index) => (
                <Link to={`/runningRecordDetail/${item.runIdx}`}>
                    <div key={index} className="record-item">
                        <img src={defaultImage} alt="Run" className="record-img" />
                        <div className="record-details">
                            <div className="record-full-date">
                                {`${new Date(item.date).getFullYear()}년 ${new Date(item.date).getMonth() + 1}월 ${new Date(item.date).getDate()}일`}
                            </div>
                            <div className="record-date">
                                {`${item.dayName} ${item.meridiem}`}
                                <span className="record-arrow">{">"}</span>
                            </div>
                            <div className="record-stats">
                                <span className="record-distance">{item.distance} km</span>
                                <span className="record-pace">{item.averagePace} /km</span>
                                <span className="record-time">{item.runningTime}</span>
                            </div>
                        </div>
                    </div>
                </Link>
            ))}
        </div>
    );
}





export default RunningRecord;