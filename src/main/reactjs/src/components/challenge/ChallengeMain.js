import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import MyChallengeList from "./MyChallengeList";
import "../../CSS/CommonApplicationStyle.css";
import exerciseImg from "../../image/exercise.png";
import runningImg from "../../image/running.png";
import ScreenHeader from "../../router/ScreenHeader";

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
        console.log(response.data);
        setMyChallengeList(response.data);
      } catch (error) {
        console.error("Error fetching exercise list:", error);
      }
    };
    fetchMyChallengeList();
  }, []);

  return (
    <div className="CommonContainer" style={{ height: "100vh" }}>
      <ScreenHeader title={"챌린지 도전하기"} />
      <section style={{ marginBottom: "16px" }}>
        <div className="exercise-main-container exercise-button primaryCard">
          <div className="exercise-item" style={{ padding: "5px" }}>
            <div
              className="exercise-content primaryCard"
              style={{ marginBottom: "8px" }}
            >
              <Link to="/exercisechallenge">
                <img
                  src={exerciseImg}
                  alt="Exercise Challenge"
                  className="exercise-image"
                  style={{ width: "50%", height: "auto" }}
                />
                <br />
              </Link>
            </div>
            <span>맨몸운동</span>
          </div>
          <div className="exercise-item" style={{ padding: "5px" }}>
            <div
              className="exercise-content primaryCard"
              style={{ marginBottom: "8px" }}
            >
              <Link to="/runningchallenge">
                <img
                  src={runningImg}
                  alt="Running Challenge"
                  className="exercise-image"
                  style={{ width: "100%", height: "100%" }}
                />
                <br />
              </Link>
            </div>
            <span>러닝</span>
          </div>
        </div>
      </section>
      <section>
        <div
          className="subject1 challenge-list-title"
          style={{ fontSize: "1.5em" }}
        >
          진행중인 챌린지 목록
        </div>
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
