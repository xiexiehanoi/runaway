import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ExerciseChallengeRowItem from './ExerciseChallengeRowItem';
import '../../CSS/CommonApplicationStyle.css'

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

const ExerciseChallenge = () => {
    const [exerciseList,setExerciseList]=useState([]);

    useEffect(()=>{
        const challengeList = async()=>{
            try {
                const response = await axios.get(`${BACKEND_URL}/api/challenge/exercise/list`);
                console.log(response);
                setExerciseList(response.data);
            } catch (error) {
                console.error("Error fetching exercise list:", error);
            }
        };
        challengeList();
    },[])

    return (
        <div>
            <head className='header-inscreen'>맨몸운동 도전하기</head>
            <div>
                    {
                        exerciseList.map((rowData,idx)=>
                            <ExerciseChallengeRowItem key={idx} row={rowData}/>
                        )
                    }
            </div>
        </div>
    );
};

export default ExerciseChallenge;