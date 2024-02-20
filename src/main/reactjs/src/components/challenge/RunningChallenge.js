import axios from 'axios';
import React, { useEffect, useState } from 'react';
import '../../CSS/RunningChallengeRowItem.css'
import RunningChallengeRowItem from './RunningChallengeRowItem';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

const RunningChallenge = () => {
    const [runningList,setRunningList]=useState([]);

    useEffect(()=>{
        const list = async()=>{
            try {
                const response = await axios.get(`${BACKEND_URL}/api/challenge/running/list`);
                console.log(response);
                setRunningList(response.data);
            } catch (error) {
                console.error("Error fetching exercise list:", error);
            }
        };

    list();

    },[])

    return (
         <div>
            <h5>총 {runningList.length}개의 러닝 챌린지에 도전하세요!</h5>
            <div className="challenge-list">
                    {
                        runningList.map((rowData,idx)=>
                            <RunningChallengeRowItem key={idx} row={rowData} idx={idx}/>
                        )
                    }
            </div>
        </div>
    );
};

export default RunningChallenge;