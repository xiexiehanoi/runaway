import React, { useEffect, useState } from "react";
import axios from "axios";
import ExerciseChallengeRowItem from "./ExerciseChallengeRowItem";
import "../../CSS/CommonApplicationStyle.css";
import "../../CSS/ChallengeList.css";
import situpImage from "../../image/sit-up.png";
import pushupImage from "../../image/push-up.png";
import squatImage from "../../image/squat.png";
import ScreenHeader from "../ScreenHeader";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

const ExerciseChallenge = () => {
  const [exerciseList, setExerciseList] = useState([]);
  const [filteredExerciseList, setFilteredExerciseList] = useState([]); 
  const [selectedType, setSelectedType] = useState("situp");

  useEffect(() => {
    const fetchExerciseList = async () => {
      try {
        const response = await axios.get(
          `${BACKEND_URL}/api/challenge/exercise/list`
        );
        console.log(response);
        setExerciseList(response.data);
      } catch (error) {
        console.error("Error fetching exercise list:", error);
      }
    };
    fetchExerciseList();
  }, []);


  const filterExerciseList = (type) => {
    if (type === selectedType) {
      setFilteredExerciseList([]);
      setSelectedType("");
    } else {
      const filtered = exerciseList.filter(
        (exercise) => exercise.exercise_type === type
      );
      setFilteredExerciseList(filtered);
      setSelectedType(type);
    }
  };

  return (
    <div>
      <ScreenHeader title={"맨몸운동 도전하기"} />
      {/* 챌린지 유형별 필터링 섹션 */}
      <>
        <div className="exercise-main-container exercise-container primaryCard">
          <div
            className="exercise-item primaryCard"
            onClick={() => filterExerciseList("squat")}
          >
            <div className="exercise-content">
              <img
                src={squatImage}
                alt="Squat"
                className="exercise-image"
                style={{width:"60%", height:"auto"}}
              />
            </div>
          </div>
          <div
            className="exercise-item  primaryCard"
            onClick={() => filterExerciseList("situp")}
          >
            <div className="exercise-content">
              <img src={situpImage} alt="Sit-up" className="exercise-image" />
            </div>
          </div>
          <div
            className="exercise-item  primaryCard"
            onClick={() => filterExerciseList("pushup")}
          >
            <div className="exercise-content">
              <img src={pushupImage} alt="Push-up" className="exercise-image" />
            </div>
          </div>
        </div>
      </>

      <div className="exercise-challenge-list-body">
        {filteredExerciseList.length > 0
          ? filteredExerciseList.map((rowData, idx) => (
              <ExerciseChallengeRowItem key={idx} row={rowData} />
            ))
          : exerciseList
              .filter((exercise) => exercise.exercise_type === selectedType)
              .map((rowData, idx) => (
                <ExerciseChallengeRowItem key={idx} row={rowData} />
              ))}
      </div>
    </div>
  );
};

export default ExerciseChallenge;
