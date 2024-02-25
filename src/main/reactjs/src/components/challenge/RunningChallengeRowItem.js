import axios from "axios";
import plusButton from "../../image/plus-button.png";
import "../../CSS/CommonApplicationStyle.css";
import "../../CSS/Challenge.css";
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
      alert("챌린지가 추가되었습니다.");
    } catch (error) {
      if (error.response.status === 409) {
        alert("이미 해당 런닝에 관한 챌린지가 존재합니다.");
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
    <div
      className="primaryCard"
      style={{
        position: "relative",
        display: "flex",
        width: "300px",
        height: "122px",
        alignItems: "center",
        marginBottom: "24px",
        color: "white",
        overflow: "hidden",
        borderRadius: "20px",
      }}
    >
      <div
        style={{
          flexGrow: 1,
          position: "relative",
        }}
      >
        <div className="challenge-subject">
          <span className="subject1">Challenge</span>
          <span className="subject2">(Running)</span>
        </div>
        <div className="challenge-daily">
          <span className="subject3">매일 {row.distance} km</span>
          <span className="subject4">({row.target_date}일)</span>
        </div>
        <br />
        <div
          className="exp-container"
          style={{ position: "relative", textAlign: "center" }}
        >
          <p
            style={{
              background: "linear-gradient(to right, #A1B1EA, #4756A1)",
              position: "absolute",
              width: "300px",
              height: "32px",
              zIndex: 1,
              lineHeight: "32px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <span
              className="exp-subject"
              style={{ position: "relative", zIndex: 2 }}
            >
              {row.exp} EXP 획득!
            </span>
          </p>
        </div>
      </div>
      <div className="buttonBox">
        <button
          className="buttonBox-plus"
          onClick={() =>
            selectChallenge(row.id, row.target_date, row.exercise_type)
          }
        >
          <img src={plusButton} alt="Add Challenge" />
        </button>
      </div>
    </div>
  );
};

export default RunningChallengeRowItem;
