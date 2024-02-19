import React from 'react';
import '../../CSS/ExerciseChallenge.css'
import axios from 'axios';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

const ExerciseChallengeRowItem = (props) => {
    const {row} = props;

    const addChallenge = async (challengeId, challengeTargetDate, exerciseType) => {
        try {
            const token = window.localStorage.getItem('token');
            if (!token) {
                console.log("Token not found.");
                return;
            }
    
            const response = await axios.post(`${BACKEND_URL}/api/challenge/exercise/insert`, {
                exerciseChallengeDto: {
                    id: challengeId,
                    target_date: challengeTargetDate,
                    exercise_type: exerciseType
                },
                start_date: new Date().toISOString().slice(0, 10)
            }, {
                headers: {
                    Authorization: token
                }
            });
            if (response.status === 200) {
                alert("챌린지 등록이 완료되었습니다.");
            }
        } catch (error) {
            if (error.response && error.response.status === 409) {
                alert("이미 해당 운동에 관한 챌린지가 존재합니다.");
            } else {
                alert("챌린지 추가 실패: " + error.response.data.message);
            }
        }
    };

    const selectChallenge = (challengeId, challengeTargetDate, exerciseType) => {
        addChallenge(challengeId, challengeTargetDate, exerciseType);
    };


    return (
        <tr>
            <td>
                <h5 className='hidden'>{row.id}</h5>
                <h5>챌린지명: {row.exercise_type}</h5>
                <h5>목표횟수: {row.target_count} 회</h5>
                <h5>기한: {row.target_date} 일</h5>
                <button type='button' onClick={() => selectChallenge(row.id, row.target_date, row.exercise_type)}>추가</button>
            </td>
        </tr>
    );
};

export default ExerciseChallengeRowItem;