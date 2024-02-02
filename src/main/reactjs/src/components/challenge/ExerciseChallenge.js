import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ExerciseChallenge = () => {
    const [exerciseList,setExerciseList]=useState([]);

    const list=()=>{
        axios.get("/exercisechallenge/list")
        .then(res=>{
            console.log(res);
            setExerciseList(res.data);
        })
    }

    useEffect(()=>{
        console.log("useEffect");
        list();
    },[]);

    return (
        <div>
            <h5>총 {exerciseList.length}개의 맨몸운동 챌린지에 도전하세요!</h5>
        </div>
    );
};

export default ExerciseChallenge;