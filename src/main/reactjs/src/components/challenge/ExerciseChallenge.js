import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ExerciseChallengeRowItem from './ExerciseChallengeRowItem';

const BASE_URL = process.env.REACT_APP_BACKEND_URL;

const ExerciseChallenge = () => {
    const [exerciseList,setExerciseList]=useState([]);

    useEffect(()=>{
        const list = async()=>{
            try {
                const response = await axios.get(`${BASE_URL}/api/challenge/exercise/list`);
                console.log(response);
                setExerciseList(response.data);
            } catch (error) {
                console.error("Error fetching exercise list:", error);
            }
        };

    list();

    },[])

    return (
        <div>
            <h5>총 {exerciseList.length}개의 맨몸운동 챌린지에 도전하세요!</h5>
            <table className='table table-bordered' >
                <tbody>
                    {
                        exerciseList.map((rowData,idx)=>
                            <ExerciseChallengeRowItem key={idx} row={rowData} idx={idx}/>
                        )
                    }
                </tbody>
            </table>
        </div>
    );
};

export default ExerciseChallenge;