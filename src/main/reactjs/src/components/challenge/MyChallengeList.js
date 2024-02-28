import React from "react";
import "../../CSS/CommonApplicationStyle.css";
import "./CSS/ChallengeList.css";
import situpImage from "../../image/sit-up.png";
import pushupImage from "../../image/push-up.png";
import squatImage from "../../image/squat.png";
import runningImage from "../../image/runaway.png";

const MyChallengeList = ({ row, idx }) => {
  const isExerciseChallenge = row.hasOwnProperty("exerciseChallengeDto");
  const challengeData = isExerciseChallenge
    ? row.exerciseChallengeDto
    : row.runningChallenge;
    console.log(11)
    console.log(challengeData)

  const formatDate = (dateString) => {
    if (!dateString || typeof dateString !== "string") return "N/A";
    const date = new Date(dateString);
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const day = date.getDate().toString().padStart(2, "0");
    return `${month}-${day}`;
  };

  const startDate = formatDate(row.start_date || row.startDate);
  const endDate = formatDate(row.end_date || row.endDate);

  let exerciseImage;
  switch (challengeData?.exercise_type) {
    case "situp":
      exerciseImage = situpImage;
      break;
    case "pushup":
      exerciseImage = pushupImage;
      break;
    case "squat":
      exerciseImage = squatImage;
      break;
    default:
      exerciseImage = runningImage;
      break;
  }

  return (
    <div
      className="primaryCard"
      style={{ borderRadius:"20px",display: "flex", margin: "16px auto 10px auto", padding: "16px", width:"300px", }}
    >
      <div className="exercise-item-inner">
        <div className="exercise-content-inner">
          {exerciseImage && (
            <img
              src={exerciseImage}
              alt={challengeData?.exercise_type}
              className="exercise-image"
            />
          )}
        </div>
      </div>
      <div className="myChallengeBox">
        {isExerciseChallenge ? (
          <>
            <strong>{challengeData?.exercise_type.toUpperCase()}</strong>
            <br />
            <strong>매일 </strong> {challengeData?.target_count}회<br />
            <strong>
              {startDate}~{endDate}&nbsp; ({challengeData?.target_date}일)
            </strong>
          </>
        ) : (
          <>
            <strong>Running</strong>
            <br />
            <strong>매일 {challengeData?.distance}km </strong>
            <br />
            <strong>
              {startDate}~{endDate}
              &nbsp; ({challengeData?.target_date}일)
            </strong>
          </>
        )}
      </div>
    </div>
  );
};
export default MyChallengeList;
