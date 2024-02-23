import React from "react";
import "../../CSS/CommonApplicationStyle.css";
import "../../CSS/Challenge.css";
import situpImage from "../../image/sit-up.png";
import pushupImage from "../../image/push-up.png";
import squatImage from "../../image/squat.png";
import runningImage from "../../image/runaway.png";

const MyChallengeList = ({ row, idx }) => {
  const isExerciseChallenge = row.hasOwnProperty("exerciseChallengeDto");
  const challengeData = isExerciseChallenge
    ? row.exerciseChallengeDto
    : row.runningChallenge;

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
      style={{ display: "flex", marginBottom: "10px", padding: "16px" }}
    >
      <div className="challengeImg">
        {exerciseImage && (
          <img src={exerciseImage} alt={challengeData?.exercise_type} />
        )}
      </div>
      <div className="myChallengeBox">
        {isExerciseChallenge ? (
          <>
            <strong>{challengeData?.exercise_type}</strong>
            <br />
            <strong>횟수: </strong> {challengeData?.target_count}회<br />
            <strong>기간: </strong>
            {startDate}~{endDate}&nbsp; ({challengeData?.target_date}일)
          </>
        ) : (
          <>
            <strong>Running</strong>
            <br />
            <strong>거리: </strong> {challengeData?.distance}km
            <br />
            <strong>기간: </strong> {startDate}~{endDate}&nbsp; (
            {challengeData?.target_date}일)
          </>
        )}
      </div>
    </div>
  );
};
export default MyChallengeList;
