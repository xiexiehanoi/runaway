import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Logout from "../login/Logout";
import MyChallenge from './MyChallenge';

import ExpBar from './ExpBar';

import MonthlyActivitySummary from './MonthlyActivitySummary';

//import './css/Mypage.css'

const Mypage = () => {
  const [user, setUser] = useState(null)
  const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
  const [myChallengeList, setMyChallengeList] = useState([]);
  const [currentMonthlyExerciseData, setCurrentMonthlyExerciseData] = useState([]);
  const [start,setStart] = useState({});
  

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
    const fetchCurrentMonthlyRunningData = async () => {
      try {
        const token = window.localStorage.getItem("token");
        if (!token) {
          console.log("Token not found.");
          return;
        }
        const response = await axios.get(
          `${BACKEND_URL}/api/profile/running/MonthlyRunningData`,
          {
            headers: {
              Authorization: `Bearer ${token}`, // 토큰을 Authorization 헤더에 포함
            },
          }
        );
        
        setCurrentMonthlyExerciseData(response.data);
      } catch (error) {
        console.error("Error fetching exercise list:", error);
      }
    };
    fetchCurrentMonthlyRunningData();
  }, []);


  const fetchStart = async () => {
    try {
      const token = window.localStorage.getItem("token");
        if (!token) {
          console.log("Token not found.");
          return;
        }
        const response = await axios.get(
          `${BACKEND_URL}/api/profile/start/date`,
          {
            headers: {
              Authorization: `Bearer ${token}`, // 토큰을 Authorization 헤더에 포함
            },
          }
        );
      
   
      setStart(response.data);

    } catch (error) {
      console.error("Failed to fetch start date: ", error);
    }
  };

  useEffect(() => {
    fetchStart();
  }, []); 

  

  return (
    <div className="mypage-container">
      <nav className="mypage-nav">
        <Link to="/my" className="nav-link">내 정보 </Link>
        <Link to="/runningRecord/" className="nav-link">나의 기록</Link>
      </nav>
      <header className="mypage-header">
        <h1>마이페이지</h1>
        {user && <div className="profile-picture" style={{ backgroundImage: `url(${user.profilePicture || 'defaultProfilePic.jpg'})` }}></div>}
      </header>
      <section className="user-info">
        <h2>내 정보</h2>
        <div className="info">
          <p><strong>이름:</strong> {user?.nickname}</p>
          <p><strong>이메일:</strong> {user?.email}</p>
          <p><strong>등급:</strong> {user?.grade.level}</p>
        </div>
      </section>

      {/* 경험치바: className='Exp'까지 같이 가져가야 출력됩니다 */}
      <section>
          <div className='Exp'>
            <ExpBar level={user?.grade.level} exp={user?.point} min={user?.grade.minPoint} max={user?.grade.maxPoint}/>
          </div>
      </section>

      <section className="user-actions">
        <h2>활동</h2>
        {/* Additional interactive elements or links to user activities could be added here */}
      </section>
      <section className="challenge-info">

          
        <div>    
            <MyChallenge myChallengeList={myChallengeList} />
            <MonthlyActivitySummary currentMonthlyExerciseData={currentMonthlyExerciseData} start={start} />
        </div>
      </section>
      <footer className="mypage-footer">
        <Logout />
      </footer>
    </div>
  );
};




export default Mypage;
