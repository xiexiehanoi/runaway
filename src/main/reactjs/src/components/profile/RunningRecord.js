import axios from 'axios';
import React, { useEffect, useState, Fragment } from 'react';
import { Link } from 'react-router-dom';
//import './css/RunningRecord.css'
function RunningRecord(props) {
    const [runningRecord, setRunningRecord] = useState([]);
    const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

    useEffect(() => {
        axios.get(`${BACKEND_URL}/api/profile/running/record`, {
            params: { userId: 20 }
        })
            .then(function (response) {
                setRunningRecord(response.data);
                // Assuming that `response.data` is an array of records and `item.path` is defined
            })
            .catch(function (error) {
                console.error(error);
            });
    }, []);



    return (
        <div style={{ width: '100%', fontFamily: 'sans-serif' }}>
            <Link to={'/my'}>내정보</Link>
            {runningRecord.map((item) => (
                <Fragment key={item.runIdx}>
                    <div style={{ cursor: 'pointer', marginBottom: '20px', border: '1px solid #ddd', borderRadius: '8px', padding: '10px' }}>
                        <Link to={`/runningRecordDetail/${item.runIdx}`}>
                            <h2>RunIdx {item.runIdx}</h2>
                            <p>Date: {item.date}</p>
                            <p>Distance: {item.distance} km</p>
                            <p>Time: {item.runningTime}</p>
                            <p>Calories: {item.calorie}</p>
                        </Link>
                    </div>
                </Fragment>
            ))}
        </div>
    );
};



export default RunningRecord;