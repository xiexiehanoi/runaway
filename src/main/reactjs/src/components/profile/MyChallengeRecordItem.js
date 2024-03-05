import React, { useEffect, useState } from "react";
import "../../CSS/CommonApplicationStyle.css";
import "./css/MyChallenge.css";
import DonutChart from "./DonutChart.js";

const MyChallengeRecordItem = ({ row }, { idx }) => {
    const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
    const [myChallengeList, setMyChallengeList] = useState([]);
    const [calculateData, setCalculateData] = useState({ successCount: 0, failureCount: 0, pendingCount: 100 });


    useEffect(() => {
        const calculateSuccessFailure = () => {
            const isExerciseChallenge = row.hasOwnProperty("exerciseChallengeDto");
            let successCount = 0;
            let failureCount = 0;
            let pendingCount = 0;

            if (isExerciseChallenge) {
                successCount = row.exerciseDays.filter(day => day.successStatus === 2).length;
                failureCount = row.exerciseDays.filter(day => day.successStatus === 1).length;
                pendingCount = row.exerciseDays.filter(day => day.successStatus === 0).length;
            } else {
                successCount = row.runningDays.filter(day => day.successStatus === 2).length;
                failureCount = row.runningDays.filter(day => day.successStatus === 1).length;
                pendingCount = row.runningDays.filter(day => day.successStatus === 0).length;
            }

            setCalculateData({ successCount, failureCount, pendingCount });
        };

        calculateSuccessFailure();
        // 만약 row 데이터가 업데이트 될 수 있다면, 아래의 의존성 배열에 row를 추가
    }, [row]); // row가 변경될 때마다 useEffect를 다시 실행

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






    return (
        <div
            className="primaryCard"
            style={{ display: "flex", margin: "10px 20px 20px 20px", padding: "16px" }}
        >
            <div className="exercise-item" style={{ width: '96px', height: '96px', marginLeft:'18px'}}>
                <DonutChart successCount={calculateData.successCount} failureCount={calculateData.failureCount} pendingCount={calculateData.pendingCount} />
            </div>
            <div className="myChallengeBox" style={{marginTop:'12px'}}>
                {isExerciseChallenge ? (
                    <>
                        <strong>{challengeData?.exercise_type}</strong>4
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
export default MyChallengeRecordItem;
