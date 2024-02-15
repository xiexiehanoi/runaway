import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ExerciseChallengeRowItem from './ExerciseChallengeRowItem';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

const ExerciseChallenge = () => {
    const [exerciseList,setExerciseList]=useState([]);
    const [userId, setUserId] = useState(null);

    useEffect(()=>{
        const list = async()=>{
            try {
                const response = await axios.get(`${BACKEND_URL}/api/challenge/exercise/list`);
                console.log(response);
                setExerciseList(response.data);
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
            <h5>총 {exerciseList.length}개의 맨몸운동 챌린지에 도전하세요!</h5>
            <table className='table table-bordered' >
                <tbody>
                    {
                        exerciseList.map((rowData,idx)=>
                            <ExerciseChallengeRowItem key={idx} row={rowData} userId={userId}/>
                        )
                    }
                </tbody>
            </table>
        </div>
    );
};

export default ExerciseChallenge;