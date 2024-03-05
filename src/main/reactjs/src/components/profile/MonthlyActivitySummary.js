import React, { useEffect, useRef, useState } from 'react';
import {  useNavigate  } from 'react-router-dom';


const MonthlyActivitySummary = ({ currentMonthlyExerciseData , start }) => {
    const [selectedTab, setSelectedTab] = useState('tab-1');
    const [selectedData, setSelectedData] = useState(currentMonthlyExerciseData?.[0] ?? {}); // 초기 값은 첫 번째 탭에 해당하는 데이터
    const navigate  = useNavigate();
    useEffect(() => {
        // props가 업데이트되면 초기 탭의 데이터를 다시 설정
        setSelectedData(currentMonthlyExerciseData?.[0] ?? {});
    }, [currentMonthlyExerciseData]);


    

    const handleChange = (event) => {
        setSelectedTab(event.target.id);
        switch (event.target.value) {
            case 'running':
                setSelectedData(currentMonthlyExerciseData[0]);
                break;
            case 'squat':
                setSelectedData(currentMonthlyExerciseData[1]);
                break;
            case 'sitUp':
                setSelectedData(currentMonthlyExerciseData[2]);
                break;
            case 'pushUp':
                setSelectedData(currentMonthlyExerciseData[3]);
                break;
            default:

                break;
        }
    };

    // Running 탭에 대한 handleClick 함수
const handleRunningClick = () => {
    // 새로운 페이지로 이동하면서 데이터를 전달
    const runningStartDate=start.runningStartDate;
    navigate("/exerciseRecords", { state: { startDate: runningStartDate } });
};

// Squat 탭에 대한 handleClick 함수
const handleSquatClick = () => {
    // 새로운 페이지로 이동하면서 데이터를 전달
    const squatStartDate=start.squatStartDate;
    navigate("/exerciseRecords", { state: { startDate:squatStartDate  } });
};

// Sit-Up 탭에 대한 handleClick 함수
const handleSitupClick = () => {
    // 새로운 페이지로 이동하면서 데이터를 전달
    const situpStartDate=start.situpStartDate;
    navigate("/exerciseRecords", { state: { startDate: situpStartDate } });
};

// Push-Up 탭에 대한 handleClick 함수
const handlePushupClick = () => {
    // 새로운 페이지로 이동하면서 데이터를 전달
    const pushupStartDate=start.pushupStartDate;
    navigate("/exerciseRecords", { state: { startDate: pushupStartDate } });
};


    



    const renderContentBasedOnExercise = () => {
        const now = new Date();

        // 현재 년도와 월 추출
        const year = now.getFullYear();
        const month = now.getMonth() + 1; // getMonth()는 0부터 시작하기 때문에 1을 더해줌
        // 총 시간, 분, 초 계산
        const hours = Math.floor(selectedData.totalSeconds / 3600);
        const minutes = Math.floor((selectedData.totalSeconds % 3600) / 60);
        const seconds = selectedData.totalSeconds % 60;

        // 시간에 대해서만 선행 0을 제외하고 포매팅
        const formattedTime = `${hours}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
        
        

        
        
        switch (selectedTab) {
            case 'tab-1': // Running
                return (
                    <>
                        <div className="activity-summary">
                            <div className="date">
                                <div> {year}년 {month}월</div>
                                <button onClick={handleRunningClick}>+</button>
                            </div>
                            <div className="total-distance">
                                <span className="number">{selectedData.totalDistance}</span><br />
                                <span className="label">킬로미터</span>
                            </div>
                            <div className="runningstats-container">
                                <div className="stat">
                                    <span className="number">{selectedData.totalCount}</span><br />
                                    <span className="label">러닝</span>
                                </div>
                                <div className="stat">
                                    <span className="number">{selectedData.averagePace}</span><br />
                                    <span className="label">평균 페이스</span>
                                </div>
                                <div className="stat">
                                    <span className="number">{selectedData.totalCalorie}</span><br />
                                    <span className="label">칼로리</span>
                                </div>
                                <div className="stat">
                                    <span className="number">{formattedTime}</span><br />
                                    <span className="label">시간</span>
                                </div>
                            </div>
                        </div>
                    </>
                );
            case 'tab-2': // Squat
                return (
                    <>
                        <div className="activity-summary">
                            <div className="date">
                                <div> {year}년 {month}월</div>
                                <button onClick={handleSquatClick}>+</button>
                            </div>
                            <div className="total-SquatCount">
                                <span className="number">{selectedData.totalSquatCount}</span><br />
                                <span className="label">횟수</span>
                            </div>
                            <div className="exercise-stats-container">
                                <div className="stat">
                                    <span className="number">{selectedData.squatDays}</span><br />
                                    <span className="label">스쿼트</span>
                                </div>

                                <div className="stat">
                                    <span className="number">{selectedData.totalSquatCalorie}</span><br />
                                    <span className="label">칼로리</span>
                                </div>

                            </div>
                        </div>
                    </>
                );
            case 'tab-3': // SitUp
                return (
                    <>
                        <div className="activity-summary">
                            <div className="date">
                                <div> {year}년 {month}월</div>
                                <button onClick={handleSitupClick}>+</button>
                            </div>
                            <div className="total-SquatCount">
                                <span className="number">{selectedData.totalSitUpCount}</span><br />
                                <span className="label">횟수</span>
                            </div>
                            <div className="exercise-stats-container">
                                <div className="stat">
                                    <span className="number">{selectedData.situpDays}</span><br />
                                    <span className="label">윗몸일으키기</span>
                                </div>

                                <div className="stat">
                                    <span className="number">{selectedData.totalSitUpCalorie}</span><br />
                                    <span className="label">칼로리</span>
                                </div>

                            </div>
                        </div>
                    </>
                );
            case 'tab-4': // PushUp
                return (
                    <>
                        <div className="activity-summary">
                            <div className="date">
                                <div> {year}년 {month}월</div>
                                <button onClick={handlePushupClick}>+</button>
                            </div>
                            <div className="total-SquatCount">
                                <span className="number">{selectedData.totalPushUpCount}</span><br />
                                <span className="label">횟수</span>
                            </div>
                            <div className="exercise-stats-container">
                                <div className="stat">
                                    <span className="number">{selectedData.pushupDays}</span><br />
                                    <span className="label">팔굽혀펴기</span>
                                </div>

                                <div className="stat">
                                    <span className="number">{selectedData.totalPushUpCalorie}</span><br />
                                    <span className="label">칼로리</span>
                                </div>

                            </div>
                        </div>
                    </>
                );
        }
    };






    return (
        <div>
            <div style={{marginLeft:'15px', marginTop:'30px'}}>이번 달 운동 통계</div>
            <div className="segmented-control">
                <input
                    type="radio"
                    name="radio2"
                    value="running"
                    id="tab-1"
                    checked={selectedTab === 'tab-1'}
                    onChange={handleChange}
                />
                <label htmlFor="tab-1" className="segmented-control__1">
                    <p>Running</p>
                </label>

                <input
                    type="radio"
                    name="radio2"
                    value="squat"
                    id="tab-2"
                    checked={selectedTab === 'tab-2'}
                    onChange={handleChange}
                />
                <label htmlFor="tab-2" className="segmented-control__2">
                    <p>Squat</p>
                </label>

                <input
                    type="radio"
                    name="radio2"
                    value="sitUp"
                    id="tab-3"
                    checked={selectedTab === 'tab-3'}
                    onChange={handleChange}
                />
                <label htmlFor="tab-3" className="segmented-control__3">
                    <p>Sit-Up</p>
                </label>

                <input
                    type="radio"
                    name="radio2"
                    value="pushUp"
                    id="tab-4"
                    checked={selectedTab === 'tab-4'}
                    onChange={handleChange}
                />
                <label htmlFor="tab-4" className="segmented-control__3">
                    <p>Push-Up</p>
                </label>
                <div className="segmented-control__color"></div>
            </div>
            <div className="currentMonthMyChallenge-container">
                {renderContentBasedOnExercise()}
            </div>

        </div>
    );
};

export default MonthlyActivitySummary;