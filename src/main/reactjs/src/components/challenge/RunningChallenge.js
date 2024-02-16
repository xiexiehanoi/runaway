import axios from 'axios';
import React, { useEffect, useState } from 'react';
import RunningChallengeRowItem from './RunningChallengeRowItem';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

const RunningChallenge = () => {
    const [runningList,setRunningList]=useState([]);
    const [userId, setUserId] = useState(null);

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

    useEffect(() => {
        const getUserId = async () => {
            try {
                const token = window.localStorage.getItem('token');
                if (!token) {
                    console.log("Token not found.");
                    return;
                }
                
                const response = await axios.get(`${BACKEND_URL}/api/login/me`, {
                    headers: {
                        Authorization: token
                    }
                });
                setUserId(response.data.id);
            } catch (error) {
                console.error("Failed to fetch user ID:", error);
            }
        };

        getUserId();
    }, []);


    return (
         <div>
            <h5>총 {runningList.length}개의 러닝 챌린지에 도전하세요!</h5>
            <table className='table table-bordered' style={{width:'500px'}}>
                <tbody>
                    {
                        runningList.map((rowData,idx)=>
                            <RunningChallengeRowItem key={idx} row={rowData} userId={userId} idx={idx}/>
                        )
                    }
                </tbody>
            </table>
        </div>
    );
};

export default RunningChallenge;