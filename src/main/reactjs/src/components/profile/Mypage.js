import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Logout from "../login/Logout";
import MyChallenge from './MyChallenge';
import ExpBar from './ExpBar';
import MonthlyActivitySummary from './MonthlyActivitySummary';
import MyProfile from "./MyProfile";


//import './css/Mypage.css'

const Mypage = () => {
  const [user, setUser] = useState(null)
  const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
  const [myChallengeList, setMyChallengeList] = useState([]);
  const [currentMonthlyExerciseData, setCurrentMonthlyExerciseData] = useState([]);
  const [start, setStart] = useState({});


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
          `${BACKEND_URL}/api/profile/exercise/MonthlyExerciseData`,
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
      <div className="header-inscreen">
        <span style={{ fontFamily: 'Anton', marginLeft: "8%" }}>MY INFO</span>
      </div>
      <MyProfile />
      <div>
        <div className='Exp'>
          <ExpBar level={user?.grade.level} exp={user?.point} min={user?.grade.minPoint} max={user?.grade.maxPoint} />
        </div>
      </div>
      <div className="challenge-info">
        <div>
          <MyChallenge myChallengeList={myChallengeList} />
          <MonthlyActivitySummary currentMonthlyExerciseData={currentMonthlyExerciseData} start={start} />
        </div>
      </div>
      <div className="mypage-footer">
        <Logout />
      </div>
    </div>
  );
};


export default Mypage;
