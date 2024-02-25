import React from "react";
import "../../CSS/CommonApplicationStyle.css";
import "../../CSS/Challenge.css";
import plusButton from "../../image/plus-button.png";
import axios from "axios";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

const ExerciseChallengeRowItem = ({ row }) => {
  const addChallenge = async (
    challengeId,
    challengeTargetDate,
    exerciseType
  ) => {
    try {
      const token = window.localStorage.getItem("token");
      if (!token) {
        console.log("Token not found.");
        return;
      }

      const response = await axios.post(
        `${BACKEND_URL}/api/challenge/exercise/insert`,
        {
          exerciseChallengeDto: {
            id: challengeId,
            target_date: challengeTargetDate,
            exercise_type: exerciseType,
          },
          start_date: new Date().toISOString().slice(0, 10),
        },
        {
          headers: {
            Authorization: token,
          },
        }
      );
      if (response.status === 200) {
        alert("챌린지 등록이 완료되었습니다.");
      }
    } catch (error) {
      if (error.response && error.response.status === 409) {
        alert("이미 해당 운동에 관한 챌린지가 존재합니다.");
      } else {
        alert("챌린지 추가 실패: " + error.response.data.message);
      }
    }
  };

  const selectChallenge = (challengeId, challengeTargetDate, exerciseType) => {
    addChallenge(challengeId, challengeTargetDate, exerciseType);
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
          <span className="subject2">({row.exercise_type})</span>
        </div>
        <div className="challenge-daily">
          <span className="subject3">매일 {row.target_count} 회</span>
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

export default ExerciseChallengeRowItem;
