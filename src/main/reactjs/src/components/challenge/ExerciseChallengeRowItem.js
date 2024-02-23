import React from 'react';
import '../../CSS/CommonApplicationStyle.css'
import '../../CSS/Challenge.css'
import plusButton from '../../image/plus-sign.png';
import axios from 'axios';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

const ExerciseChallengeRowItem = ({ row }) => {
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
        <div className='primaryCard' style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px', padding: "16px", color: 'white' }}>
            <div>
                <strong className="challenge-subject">챌 린 지 : {row.exercise_type}</strong> <br />
                <strong>목표 횟수 : {row.target_count} 회 / 일</strong>&nbsp;&nbsp;
                <strong>(기한:{row.target_date} 일)</strong><br />
                <strong className="challenge-subject">경 험 치 : {row.exp}</strong>
            </div>
            <div className='buttonBox'>
                <a className='buttonBox-plus' onClick={() => selectChallenge(row.id, row.target_date, row.exercise_type)}>
                    <img src={plusButton} alt="Add Challenge" />
                </a>
            </div>
        </div>
    );
};

export default ExerciseChallengeRowItem;
