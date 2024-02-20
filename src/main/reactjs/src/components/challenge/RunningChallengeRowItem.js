import axios from "axios";
import "../../CSS/RunningChallengeRowItem.css";
import React, { useState } from "react";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const RunningChallengeRowItem = (props) => {
  const { row } = props;
  const [errorMessage, setErrorMessage] = useState("");

  const addChallenge = async (challengeId, challengeTargetDate) => {
    try {
      const token = window.localStorage.getItem("token");
      if (!token) {
        console.log("Token not found.");
        return;
      }

      const response = await axios.post(
        `${BACKEND_URL}/api/challenge/running/insert`,
        {
          runningChallenge: {
            id: challengeId,
            target_date: challengeTargetDate,
          },
          start_date: new Date().toISOString().slice(0, 10),
        },
        {
          headers: {
            Authorization: token,
          },
        }
      );
      console.log("챌린지 추가:", response);
    } catch (error) {
      if (error.response.status === 409) {
        alert("이미 해당 날짜의 challenge가 있습니다.");
      } else {
        console.error("챌린지 추가 실패:", error);
        setErrorMessage(error.response.data);
      }
    }
  };

  const selectChallenge = (challengeId, challengeTargetDate) => {
    addChallenge(challengeId, challengeTargetDate);
  };
  return (
    <div className="challenge-item">
      <div className="challenge-item-box">
        Daily: {row.distance}km<br/>
        기한: {row.target_date}일<br/>
        경험치: {row.exp}
      </div>
      <div>
        <button
          className="challenge-button"
          type="button"
          onClick={() => selectChallenge(row.id, row.target_date)}
        >
          추가
        </button>
      </div>
      </div>
  );
};

export default RunningChallengeRowItem;
