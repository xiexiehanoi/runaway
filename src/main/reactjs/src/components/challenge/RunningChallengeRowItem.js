import axios from 'axios';
import React from 'react';
import { useNavigate } from 'react-router-dom';

const RunningChallengeRowItem = (props) => {
    const {row,idx}=props;
    const navi=useNavigate();

    const addMyRunning=()=>{
        axios.post("/challenge/myexercise/insert",{idx})
        .then(res=>{
            navi("/challengemain");
        })
    }

    return (
        <tr>
            <td>
                <h5>번호:{idx}</h5>
                <h5>챌린지명:{row.name}</h5>
                <h5>목표거리:{row.distance}km</h5>
                <h5>기한:{row.end}일</h5>
                <button type='button' className='btn btn-outline-danger btn-sm'
                onClick={addMyRunning}>
                    추가
                </button>
            </td>
        
        
        </tr>
    );
};

export default RunningChallengeRowItem;