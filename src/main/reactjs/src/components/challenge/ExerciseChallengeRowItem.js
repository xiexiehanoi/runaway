import React from 'react';
import '../../CSS/ExerciseChallenge.css'
import axios from 'axios';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

const ExerciseChallengeRowItem = (props) => {
    const {row, userId} = props;

    const addChallenge = async (challengeId, challengeTargetDate) => {
        try {
            const token = window.localStorage.getItem('token');
            if (!token) {
                console.log("Token not found.");
                return;
            }
    
            const response = await axios.post(`${BACKEND_URL}/api/challenge/exercise/insert`, {
                user: { id: userId }, 
                exerciseChallengeDto: {
                    id: challengeId,
                    target_date: challengeTargetDate
                },
                start_date: new Date().toISOString().slice(0, 10)
            }, {
                headers: {
                    Authorization: token
                }
            });
            console.log("챌린지 추가:", response);
        } catch (error) {
            console.error("챌린지 추가 실패:", error);
        }
    };    

    const selectChallenge = (challengeId, challengeTargetDate) => {
        addChallenge(challengeId, challengeTargetDate);
    };


    return (
        <tr>
            <td>
                <h5 className='hidden'>{row.id}</h5>
                <h5>챌린지명: {row.exercise_type}</h5>
                <h5>목표횟수: {row.target_count} 회</h5>
                <h5>기한: {row.target_date} 일</h5>
                <button type='button' onClick={() => selectChallenge(row.id, row.target_date)}>추가</button>
            </td>
        </tr>
    );
};

export default ExerciseChallengeRowItem;