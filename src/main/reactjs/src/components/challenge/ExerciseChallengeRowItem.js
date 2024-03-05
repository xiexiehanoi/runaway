import React from "react";
import "../../CSS/CommonApplicationStyle.css";
import "../../CSS/ChallengeList.css";
import plusButton from "../../image/plus-button.png";
import axios from "axios";
import Swal from 'sweetalert2';

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
        Swal.fire({
          icon: "success",
          title:'챌린지 등록이<br /> 완료되었습니다.',
          confirmButtonText: '확인',
          customClass: {
            confirmButton: 'sa-confirm-button-class-custom',
            title: 'sa2-title-class',
            icon: 'sa2-icon-class',
            popup: 'sa2-popup-class',
            container: 'sa2-container-class'
          }
        })
      }
    } catch (error) {
      if (error.response && error.response.status === 409) {
        Swal.fire({
          icon: "warning",
          title:'이미 해당 운동에 대한<br /> 챌린지가 존재합니다.',
          confirmButtonText: '확인',
          customClass: {
            title: 'sa2-title-class',
            icon: 'sa2-icon-class',
            popup: 'sa2-popup-class',
            container: 'sa2-container-class'
          },
          html: "이전에 등록한 챌린지를 완료 후<br /> 다시 등록해주세요."
        })
      } else {
        Swal.fire({
          icon: "Error",
          title:'챌린지 추가 실패: error.response.data.message',
          confirmButtonText: '확인',
          customClass: {
            title: 'sa2-title-class',
            icon: 'sa2-icon-class',
            popup: 'sa2-popup-class',
            container: 'sa2-container-class'
          }
        })
      }
    }
  };

  const selectChallenge = (challengeId, challengeTargetDate, exerciseType) => {
    addChallenge(challengeId, challengeTargetDate, exerciseType);
  };

  return (
    <div className="primaryCard exercise-challenge-list">
      <div
        style={{
          flexGrow: 1,
          position: "relative",
        }}
      >
        <div className="challenge-subject">
          <span className="subject1">Challenge</span>
          <span className="subject2">({row.exercise_type.toUpperCase()})</span>
        </div>
        <div className="challenge-daily">
          <span className="subject3">매일 {row.target_count} 회</span>&nbsp;
          <span className="subject4">({row.target_date}일)</span>
        </div>
        <br />
        <div
          className="exp-container"
          style={{ position: "relative", textAlign: "center" }}
        >
          <p className="exp-bar">
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
        <div
          className="buttonBox-plus"
          onClick={() =>
            selectChallenge(row.id, row.target_date, row.exercise_type)
          }
        >
          <img src={plusButton} alt="Add Challenge" />
        </div>
      </div>
    </div>
  );
};

export default ExerciseChallengeRowItem;
