import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import MyChallengeList from "./MyChallengeList";
import "../../CSS/MainLayout.css";
import "../../CSS/CommonApplicationStyle.css";
import exerciseImg from "../../image/exercise.png";
import runningImg from "../../image/runaway.png";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

const ChallengeMain = () => {
  const [myChallengeList, setMyChallengeList] = useState([]);

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
        console.log(response);
        setMyChallengeList(response.data);
      } catch (error) {
        console.error("Error fetching exercise list:", error);
      }
    };
    fetchMyChallengeList();
  }, []);

  return (
    <div style={{ height: "100vh" }}>
      <head className="header-inscreen" style={{ padding: "10px" }}>
        챌린지 도전하기
      </head>
      <section style={{ marginBottom: "16px" }}>
        <div className="exercise-container">
          <div className="exercise-item">
            <div className="exercise-content">
              <Link to="/exercisechallenge">
                <img
                  src={exerciseImg}
                  alt="Exercise Challenge"
                  className="exercise-image"
                  style={{ width: "100%", height: "100%" }}
                />
                <br />
              </Link>
            </div>
            <span>맨몸운동</span>
          </div>
          <div className="exercise-item">
            <div className="exercise-content">
              <Link to="/runningchallenge">
                <img
                  src={runningImg}
                  alt="Running Challenge"
                  className="exercise-image"
                  style={{ width: "80%", height: "80%" }}
                />
                <br />
              </Link>
            </div>
            <span>러닝</span>
          </div>
        </div>
      </section>
      <section>
        <head className="header-inscreen" style={{ padding: "10px" }}>
          진행중인 챌린지 목록
        </head>
        <div>
          {myChallengeList.map((rowData, idx) => (
            <MyChallengeList key={idx} row={rowData} idx={idx} />
          ))}
        </div>
      </section>
    </div>
  );
};

export default ChallengeMain;
