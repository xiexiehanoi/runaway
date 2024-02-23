import axios from "axios";
import plusButton from '../../image/plus-sign.png';
import '../../CSS/CommonApplicationStyle.css'
import '../../CSS/Challenge.css'
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
    <div className='primaryCard' style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px', padding: "16px", color: 'white' }}>
        <div>
          <strong className="challenge-subject">챌 린 지 : Running</strong> <br />
          <strong>목표거리&nbsp;:&nbsp;&nbsp;{row.distance}km /일 </strong>&nbsp;&nbsp;
          <strong>(기   한 :  {row.target_date}일)</strong><br />
          <strong className="challenge-subject">경험치:{row.exp}</strong>
        </div>
        <div className="buttonBox">
          <a className='buttonBox-plus' onClick={() =>selectChallenge(row.id, row.target_date)}>
           <img src={plusButton} alt="Add Challenge" />
          </a>
        </div>
    </div>
  );
};

export default RunningChallengeRowItem;
