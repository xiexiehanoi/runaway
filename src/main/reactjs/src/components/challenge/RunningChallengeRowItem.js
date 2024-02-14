import axios from 'axios';
import React from 'react';
import { useNavigate } from 'react-router-dom';

const BASE_URL =  process.env.REACT_APP_BACKEND_URL;
const RunningChallengeRowItem = (props) => {
    const {row,idx}=props;
    const navi=useNavigate();

    // const addMyRunning=async()=>{
    //     try {
    //         const res = await axios.post(`${BASE_URL}/myrunning/insert`,{idx});
    //         navi("/challengemain");
    //     } catch (error) {
    //         console.error("Error adding my running:", error);
    //     }
    // }

    return (
        <tr>
            <td>
                <h5>번호:{idx+1}</h5>
                
                <h5>목표거리:{row.distance}km</h5>
                <h5>기한:{row.target_date}일</h5>
                <h5>경험치:{row.exp}</h5>
                {/* <button type='button' className='btn btn-outline-danger btn-sm'
                onClick={addMyRunning}>
                    추가
                </button> */}
            </td>
        
        
        </tr>
    );
};

export default RunningChallengeRowItem;