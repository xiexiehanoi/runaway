import React from "react";
import "../../CSS/CommonApplicationStyle.css";
import "../../CSS/Challenge.css";
import situpImage from "../../image/sit-up.png";
import pushupImage from "../../image/push-up.png";
import squatImage from "../../image/squat.png";
import runningImage from "../../image/runaway.png";
import DonutChart from "./DonutChart";
import calculateSuccessFailure from "./calculateSuccessFailure.js"

const MyChallenge = ({ row, idx }) => {
  const isExerciseChallenge = row.hasOwnProperty("exerciseChallengeDto");
  const challengeData = isExerciseChallenge
    ? row.exerciseChallengeDto
    : row.runningChallenge;

    
    let exerciseData = {};
    let runningData = {};
    
    if (row.exerciseChallengeDto) {
      // 운동 데이터인 경우
      exerciseData[idx] = row;
    } else if (row.runningChallenge) {
      // 러닝 데이터인 경우
      runningData[idx] = row;
      
    }


    console.log(row)

  const formatDate = (dateString) => {
    if (!dateString || typeof dateString !== "string") return "N/A";
    const date = new Date(dateString);
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const day = date.getDate().toString().padStart(2, "0");
    return `${month}-${day}`;
  };

  const startDate = formatDate(row.start_date || row.startDate);
  const endDate = formatDate(row.end_date || row.endDate);

   // 챌린지 데이터 분석 및 도넛 차트 데이터 준비
   const { successCount, failureCount, totalDays } = calculateSuccessFailure(exerciseData,runningData,challengeData, isExerciseChallenge,idx);


  let exerciseImage;
  switch (challengeData?.exercise_type) {
    case "Sit-UP":
      exerciseImage = situpImage;
      break;
    case "Push-UP":
      exerciseImage = pushupImage;
      break;
    case "Squat":
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
      <div className="exercise-item">
        <div className="exercise-content">
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
            <strong>{challengeData?.exercise_type}</strong>
             {/* DonutChart 컴포넌트에 성공 횟수와 실패 횟수 전달 */}
      <DonutChart successCount={successCount} failureCount={failureCount} totalDays={totalDays} />
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
export default MyChallenge;
