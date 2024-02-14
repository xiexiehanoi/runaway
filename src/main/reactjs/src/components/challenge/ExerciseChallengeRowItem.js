import axios from 'axios';
import React, { useState } from 'react';
import '../../CSS/ExerciseChallenge.css'

const BASE_URL = process.env.REACT_APP_BACKEND_URL;

const ExerciseChallengeRowItem = ({row}) => {
    const [addchallenge, setAddChallenge] = useState([]);

    const addExerciseChanllenge=async()=>{
        try {
            const response = await axios.post(`${BASE_URL}/api/challenge/exercise/insert`,  {
                userId: 9,
                exercise_challenge_id: row.id,
                target_date: row.target_date
            });
            console.log(response);
            setAddChallenge(response.data);
        } catch (error) {
            console.error("Error adding exercise challenge:", error);
        }

            //     const token = window.localStorage.getItem('token');
        //     const response = await axios.post(`${BASE_URL}/api/challenge/exercise/insert`, {
        //         exerciseType: row.exercise_type,
        //         targetCount: row.target_count,
        //         targetDate: row.target_date,
                
        //     }, {
        //         headers: {
        //             Authorization: `Bearer ${token}`
        //         }
        //     });
        //     console.log(response);
        //     setAddChallenge(response.data);
        // } catch (error) {
        //     console.error("Error adding exercise challenge:", error);
        // }
    }

    return (
        <tr>
            <td>
                <h5 className='hidden'>{row.id}</h5>
                <h5>챌린지명: {row.exercise_type}</h5>
                <h5>목표횟수: {row.target_count} 회</h5>
                <h5>기한: {row.target_date} 일</h5>
                <button type='button' onClick={addExerciseChanllenge}>추가</button>
            </td>
        </tr>
    );
};

export default ExerciseChallengeRowItem;