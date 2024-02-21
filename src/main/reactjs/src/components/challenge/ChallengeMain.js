import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import MyChallengeList from './MyChallengeList';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

const ChallengeMain = () => {
    const [myChallengeList,setMyChallengeList]=useState([]);

    useEffect(()=>{
        const fetchMyChallengeList = async()=>{
            try {
                const token = window.localStorage.getItem('token');
            if (!token) {
                console.log("Token not found.");
                return;
            }
            const response = await axios.get(`${BACKEND_URL}/api/challenge/challengemain/mychallengelist`, {
                headers: {
                    'Authorization': `Bearer ${token}` // 토큰을 Authorization 헤더에 포함
                }
            });
            console.log(response);
            setMyChallengeList(response.data);
        } catch (error) {
            console.error("Error fetching exercise list:", error);
        }
    };
        fetchMyChallengeList();
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
            <strong>진행 중인 Challenge</strong>
            <table className='table table-bordered' >
                <tbody>
                    {
                        myChallengeList.map((rowData,idx)=>
                            <MyChallengeList key={idx} row={rowData} idx={idx}/>
                        )
                    }
                </tbody>
            </table>

        </div>
        
    );
};

export default ChallengeMain;