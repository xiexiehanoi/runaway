import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ExerciseChallengeRowItem from './ExerciseChallengeRowItem';
import '../../CSS/CommonApplicationStyle.css'
import situpImage from '../../image/situp.png';
import pushupImage from '../../image/push-up.png';
import squatImage from '../../image/squats.png';


const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

const ExerciseChallenge = () => {
    const [exerciseList, setExerciseList] = useState([]);
    const [filteredExerciseList, setFilteredExerciseList] = useState([]); // 필터링된 챌린지 목록 상태
    const [selectedType, setSelectedType] = useState('situp'); // 선택된 챌린지 유형 상태 (기본값: situp)

    useEffect(() => {
        const fetchExerciseList = async () => {
            try {
                const response = await axios.get(`${BACKEND_URL}/api/challenge/exercise/list`);
                console.log(response);
                setExerciseList(response.data);
            } catch (error) {
                console.error("Error fetching exercise list:", error);
            }
        };
        fetchExerciseList();
    }, []);

    // 챌린지 유형을 선택하고 해당 유형의 챌린지만 필터링하는 함수
    const filterExerciseList = (type) => {
        if (type === selectedType) {
            setFilteredExerciseList([]);
            setSelectedType('');
        } else {
            const filtered = exerciseList.filter((exercise) => exercise.exercise_type === type);
            setFilteredExerciseList(filtered);
            setSelectedType(type);
        }
    };

    return (
        <div>
            <header className='header-inscreen' style={{padding:"10px"}}>맨몸운동 도전하기</header>
            {/* 챌린지 유형별 필터링 섹션 */}
            <div className="exercise-container">
                <div className="exercise-item" onClick={() => filterExerciseList('Squat')}>
                    <div className='exercise-content'>
                        <img src={squatImage} alt="Squat" className="exercise-image" style={{width:"56%"}}/>
                    </div>
                </div>
                <div className="exercise-item" onClick={() => filterExerciseList('Sit-UP')}>
                    <div className='exercise-content'>
                        <img src={situpImage} alt="Sit-up" className="exercise-image" />
                    </div>
                </div>
                <div className="exercise-item" onClick={() => filterExerciseList('Push-UP')}>
                    <div className='exercise-content'>
                        <img src={pushupImage} alt="Push-up" className="exercise-image" />
                    </div>
                </div>
            </div>

            <div className='exerciseChallengeListBody' style={{ marginTop: '16px' }}>
                {filteredExerciseList.length > 0 ?
                    filteredExerciseList.map((rowData, idx) =>
                        <ExerciseChallengeRowItem key={idx} row={rowData} />
                    ) :

                    exerciseList
                        .filter((exercise) => exercise.exercise_type === selectedType)
                        .map((rowData, idx) =>
                            <ExerciseChallengeRowItem key={idx} row={rowData} />
                        )
                }
            </div>
        </div>
    );
};

export default ExerciseChallenge;
