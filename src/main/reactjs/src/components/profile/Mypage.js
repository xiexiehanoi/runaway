import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Logout from "../login/Logout";
import MyChallenge from './MyChallenge';

import ExpBar from './ExpBar';

import MyChallengeMonthlyRecord from './MyChallengeMonthlyRecord';
import MyProfile from "./MyProfile";

//import './css/Mypage.css'

const Mypage = () => {
  const [user, setUser] = useState(null)
  const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
  const [myChallengeList, setMyChallengeList] = useState([]);
  const [currentMonthMyChallengeList, setCurrentMonthMyChallengeList] = useState([]);
  

  useEffect(() => {
    const token = window.localStorage.getItem('token');
    if (!token) {
      console.log("token not found")
      return;
    }
    axios.get(`${BACKEND_URL}/api/login/me`, {
      headers: {
        Authorization: token
      }
    })
      .then(function (response) {
        setUser(response.data)
      })
      .catch(function (error) {
        console.error(error);
      });
  }, []);

  useEffect(() => {
    const fetchMyChallengeList = async () => {
      try {
        const token = window.localStorage.getItem("token");
        if (!token) {
          console.log("Token not found.");
          return;
        }
        const response = await axios.get(
          `${BACKEND_URL}/api/challenge/challengemain/mychallengelist`,
          {
            headers: {
              Authorization: `Bearer ${token}`, // 토큰을 Authorization 헤더에 포함
            },
          }
        );
        setMyChallengeList(response.data);
      } catch (error) {
        console.error("Error fetching exercise list:", error);
      }
    };
    fetchMyChallengeList();
  }, []);

  useEffect(() => {
    const fetchCurrentMonthMyChallengeList = async () => {
      try {
        const token = window.localStorage.getItem("token");
        if (!token) {
          console.log("Token not found.");
          return;
        }
        const response = await axios.get(
          `${BACKEND_URL}/api/challenge/challengemain/currentMonthMychallengelist`,
          {
            headers: {
              Authorization: `Bearer ${token}`, // 토큰을 Authorization 헤더에 포함
            },
          }
        );
        console.log(11)
        console.log(response.data);
        
        setCurrentMonthMyChallengeList(response.data);
      } catch (error) {
        console.error("Error fetching exercise list:", error);
      }
    };
    fetchCurrentMonthMyChallengeList();
  }, []);

  

  return (
    <div className="mypage-container">
      <MyProfile />

      {/* 경험치바: className='Exp'까지 같이 가져가야 출력됩니다 */}
      <section>
          <div className='Exp'>
            <ExpBar level={user?.grade.level} exp={user?.point} min={user?.grade.minPoint} max={user?.grade.maxPoint}/>
          </div>
      </section>

      <section className="challenge-info">
        <head className="header-inscreen" style={{ padding: "10px" }}>
          진행중인 챌린지 목록
        </head>
        <div>    
            <MyChallenge myChallengeList={myChallengeList} />
            {/* <MyChallengeMonthlyRecord currentMonthMyChallengeList={currentMonthMyChallengeList}/> */}
        </div>
      </section>
      <footer className="mypage-footer">
        <Logout />
      </footer>
    </div>
  );
};




export default Mypage;
