import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import MyChallengeList from './MyChallengeList';
import axios from 'axios';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

const ChallengeMain = () => {
    const [myChallengeList,setMyChallengeList]=useState([]);

    useEffect(()=>{
        const myChallengeList = async()=>{
            try {
                const response = await axios.get(`${BACKEND_URL}/api/challenge/exercise/mychallengelist`);
                console.log(response);
                setMyChallengeList(response.data);
            } catch (error) {
                console.error("Error fetching exercise list:", error);
            }
        };
        myChallengeList();
    },[])

    return (
        <div>
            mychallenge
            <p>
                <Link to="/exercisechallenge">맨몸운동 챌린지</Link>
            </p>
            <p>
                <Link to="/runningchallenge">러닝 챌린지</Link>
            </p>
            내 챌린지 목록
            <table className='table table-bordered' >
                <tbody>
                    {
                        myChallengeList.map((rowData,idx)=>
                            <MyChallengeList key={idx} row={rowData}/>
                        )
                    }
                </tbody>
            </table>

        </div>
        
    );
};

export default ChallengeMain;