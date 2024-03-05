import axios from "axios";
import React, { useEffect, useState } from "react";
import RunningChallengeRowItem from "./RunningChallengeRowItem";
import runningImg from "../../image/running.png";
import ScreenHeader from "../ScreenHeader";

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
      <ScreenHeader title={"러닝 도전하기"} />
      <div className="exercise-main-container exercise-container primaryCard">
      <div  className="exercise-item primaryCard">
        <div className="exercise-content" style={{width:"100px", height:"100px"}}>
          <img
            src={runningImg}
            alt="Running"
            className="exercise-image" style={{width:"90%", height:"90%"}}
          />
        </div>
      </div>
      </div>
      <div className="exercise-challenge-list-body">
        {runningList.map((rowData, idx) => (
          <RunningChallengeRowItem key={idx} row={rowData} idx={idx} />
        ))}
      </div>
    </div>
  );
};

export default RunningChallenge;
