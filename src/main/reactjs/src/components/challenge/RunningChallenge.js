import axios from "axios";
import React, { useEffect, useState } from "react";
import RunningChallengeRowItem from "./RunningChallengeRowItem";
import runningImg from "../../image/running.png";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

const RunningChallenge = () => {
  const [runningList, setRunningList] = useState([]);

  useEffect(() => {
    const list = async () => {
      try {
        const response = await axios.get(
          `${BACKEND_URL}/api/challenge/running/list`
        );
        console.log(response);
        setRunningList(response.data);
      } catch (error) {
        console.error("Error fetching exercise list:", error);
      }
    };

    list();
  }, []);

  return (
    <div>
      <header className="header-inscreen" style={{ padding: "10px" }}>
        러닝 도전하기
      </header>
      <div className="exercise-container" style={{marginBottom:"16px"}}>
        <div className="exercise-content" style={{width:"110px", height:"110px"}}>
          <img
            src={runningImg}
            alt="Squat"
            className="exercise-image"
            style={{ width: "90%" }}
          />
        </div>
      </div>
      <div
        className="runningChallengeListBody"
        style={{
          marginTop: "40px",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        {runningList.map((rowData, idx) => (
          <RunningChallengeRowItem key={idx} row={rowData} idx={idx} />
        ))}
      </div>
    </div>
  );
};

export default RunningChallenge;
