import React, { useEffect, useState } from "react";
import DonutChart from "./DonutChart";
import calculateSuccessFailure from "./calculateSuccessFailure.js"
import './css/MyChallenge.css'
import { Link } from "react-router-dom";



const MyChallenge = ({ myChallengeList }) => {
  const [runningData, setRunningData] = useState({ successCount: 0, failureCount: 0, pendingCount: 100 });
  const [squatData, setSquatData] = useState({ successCount: 0, failureCount: 0, pendingCount: 7 });
  const [sitUpData, setSitUpData] = useState({ successCount: 0, failureCount: 0, pendingCount: 7 });
  const [pushUpData, setPushUpData] = useState({ successCount: 0, failureCount: 0, pendingCount: 7 });

  
  useEffect(() => {
    myChallengeList.forEach((row) => {
      let result = { successCount: 0, failureCount: 0, pendingCount: 0 };
      
      switch (row.exerciseChallengeDto?.exercise_type) {
        case "situp":
          result = calculateSuccessFailure(row, sitUpData);
          setSitUpData(result);
          break;
        case "pushup":
          result = calculateSuccessFailure(row, pushUpData);
          setPushUpData(result);
          break;
        case "squat":
          result = calculateSuccessFailure(row, squatData);
          setSquatData(result);
          break;
        default:
          result = calculateSuccessFailure(row, runningData);
          setRunningData(result);
          break;
      }
    });
  }, [myChallengeList]);


  return (
    <div className="MyChallenge-container">
  <div className="MyChallenge-title">
    <div>Challenge 달성률</div>
    <div style={{fontSize:'24px'}}><Link to="/mychallengerecordlist/" className="nav-link">+</Link></div>
  </div>
  <div className="MyChallenge-items-container">
    <div className="MyChallenge-item" style={{ width: '62px', height: '62px' }}>
      <DonutChart successCount={runningData.successCount} failureCount={runningData.failureCount} pendingCount={runningData.pendingCount} />
      <strong className="donutChart-description">running</strong>
    </div>
    <div className="MyChallenge-item" style={{ width: '62px', height: '62px' }}>
      <DonutChart successCount={squatData.successCount} failureCount={squatData.failureCount} pendingCount={squatData.pendingCount} />
      <strong className="donutChart-description">squat</strong>
    </div>
    <div className="MyChallenge-item" style={{ width: '62px', height: '62px' }}>
      <DonutChart successCount={sitUpData.successCount} failureCount={sitUpData.failureCount} pendingCount={sitUpData.pendingCount} />
      <strong className="donutChart-description">sit-up</strong>
    </div>
    <div className="MyChallenge-item" style={{ width: '62px', height: '62px' }}>
      <DonutChart successCount={pushUpData.successCount} failureCount={pushUpData.failureCount} pendingCount={pushUpData.pendingCount} />
      <strong className="donutChart-description">push-up</strong>
    </div>
  </div>
</div>
  );
};

export default MyChallenge;
