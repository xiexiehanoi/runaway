import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import MyChallengeList from './MyChallengeList';
import '../../CSS/MainLayout.css'
import '../../CSS/CommonApplicationStyle.css'
import exerciseImg from '../../image/exercise.png'
import runningImg from '../../image/runaway.png'

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
        <div style={{ height: '100vh' }}>
            <section style={{marginBottom:"5px"}}>
                <head className='header-inscreen' style={{padding:"10px"}}>챌린지 도전하기</head>
                <div style={{ display: 'flex', justifyContent: 'center', width:"95%"}}>
                <div style={{ flex: '1', display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', minWidth: '170px', padding: "10px"}}>
                    <Link to="/exercisechallenge" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding:"10px"}}>
                        <img src={exerciseImg} alt="Exercise Challenge" style={{ width: "100%", height: "110%", marginBottom: '5px' }} />
                        맨몸운동
                    </Link>
                </div>
                <div style={{ flex: '1', display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', minWidth: '170px' }}>
                    <Link to="/runningchallenge" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                        <img src={runningImg} alt="Running Challenge" style={{ width: "70%", height: "86%", marginBottom: '5px' }} />
                        러닝
                    </Link>
                </div>
            </div>
            </section>
            <section>
            <head className='header-inscreen' style={{padding:"10px"}}>진행중인 챌린지 목록</head >
            <div>
                    {
                        myChallengeList.map((rowData,idx)=>
                            <MyChallengeList key={idx} row={rowData} idx={idx}/>
                        )
                    }
             
            </div>
            </section>


        </div>
        
    );
};

export default ChallengeMain;