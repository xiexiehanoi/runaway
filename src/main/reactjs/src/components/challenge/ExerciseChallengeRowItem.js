import React, { useEffect, useState } from 'react';
import '../../CSS/ExerciseChallenge.css'
import axios from 'axios';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

const ExerciseChallengeRowItem = (props) => {
    const {row} = props;
    const [selectedChallenge, setSelectedChallenge] = useState(null);
    
    const addChallenge = async () => {
        if (!selectedChallenge) {
            return;
        }
        try {
            const response = await axios.post(`${BACKEND_URL}/api/challenge/exercise/insert`, {
                user: { id: 9 },
                exerciseChallengeDto: {
                    id: selectedChallenge.id
                },
                start_date: new Date().toISOString().slice(0, 10),
            });
            console.log("챌린지 추가:", response);
        } catch (error) {
            console.error("챌린지 추가 실패:", error);
        }
    };

    const selectChallenge = () => {
        setSelectedChallenge(row);
    };

    useEffect(() => {
        addChallenge();
    }, [selectedChallenge]);

    return (
        <tr>
            <td>
                <h5 className='hidden'>{row.id}</h5>
                <h5>챌린지명: {row.exercise_type}</h5>
                <h5>목표횟수: {row.target_count} 회</h5>
                <h5>기한: {row.target_date} 일</h5>
                <button type='button' onClick={selectChallenge}>추가</button>
            </td>
        </tr>
    );
};

export default ExerciseChallengeRowItem;