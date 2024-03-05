import React, { useState, useEffect } from 'react';
import moment from 'moment';
import { Link, useLocation } from 'react-router-dom';
import axios from 'axios';
import defaultImage from './Img/default-img.jpg';


const ExerciseRecords = () => {
    const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
    const [period, setPeriod] = useState('monthly');
    const [selectedDetail, setSelectedDetail] = useState('');
    const [records, setRecords] = useState([]);
    const location = useLocation();
    const startDate = location.state?.startDate ? moment(location.state.startDate) : moment(); // 서버에서 받은 시작 날짜를 사용하거나 기본값으로 현재 날짜 설정
    const exerciseType = location.state?.exerciseType || 'running';
    const [summary, setSummary] = useState({ totalDistance: 0 });

    useEffect(() => {
        const sum = calculateSumForSelectedPeriod();
        setSummary(sum);
    }, [records, selectedDetail, period]); // 의존성 배열에 records, selectedDetail, period 추가

    console.log(records);
    console.log(11)
    // 세부 옵션을 동적으로 생성하는 함수
    const generateDetailOptions = (period, startDate) => {
        const options = [];
        const today = moment();
        let start = moment(startDate); // 서버에서 받은 시작 날짜를 사용

        switch (period) {
            case 'weekly':
                while (start <= today) {
                    // 주의 시작을 월요일로 설정
                    let startOfWeek = start.startOf('isoWeek');
                    // 주의 끝을 일요일로 설정
                    let endOfWeek = moment(start).endOf('isoWeek');
                    if (endOfWeek > today) endOfWeek = today;
                    options.push({
                        value: startOfWeek.format('YYYY-MM-DD'),
                        label: `${startOfWeek.format('YYYY-MM-DD')} - ${endOfWeek.format('YYYY-MM-DD')}`
                    });
                    // 다음 주로 이동
                    start = start.add(1, 'weeks');
                }
                break;
            case 'monthly':
                while (start.startOf('month') <= today.startOf('month')) {
                    let label = start.format('YYYY-MM');
                    options.push({
                        value: label,
                        label: label
                    });
                    start = start.add(1, 'months'); // 다음 달로 이동
                }
                break;
            case 'yearly':
                while (start <= today) {
                    let endOfYear = moment(start).endOf('year');
                    if (endOfYear > today) endOfYear = today;
                    options.push({
                        value: start.format('YYYY'),
                        label: start.format('YYYY')
                    });
                    start = start.add(1, 'years'); // 다음 해로 이동
                }
                break;
            case 'all':
                options.push({ value: 'all', label: '전체 기간' });
                break;
        }
        return options;
    };

    useEffect(() => {
        // 현재 날짜를 기준으로 세부 옵션 설정
        let currentOption;
        if (period === 'weekly') {
            currentOption = moment().startOf('isoWeek').format('YYYY-MM-DD');
        } else if (period === 'monthly') {
            currentOption = moment().format('YYYY-MM');
        } else if (period === 'yearly') {
            currentOption = moment().format('YYYY');
        } else {
            currentOption = 'all';
        }

        setSelectedDetail(currentOption);
    }, [period, exerciseType]);

    useEffect(() => {
        const fetchRecords = async () => {
            try {
                // 로컬 스토리지에서 토큰 가져오기
                const token = window.localStorage.getItem("token");
                if (!token) {
                    console.log("Token not found.");
                    return;
                }

                // 선택된 세부사항(selectedDetail)이 유효한지 확인
                if (!selectedDetail) {
                    console.log("Selected detail is empty or invalid.");
                    return; // selectedDetail이 유효하지 않으면 여기서 함수 종료
                }

                // 선택된 기간과 세부사항을 쿼리에 포함
                const query = selectedDetail ? `&detail=${selectedDetail}` : '';
                // axios 요청
                const response = await axios.get(`${BACKEND_URL}/api/profile/${exerciseType}/records?period=${period}${query}`, {
                    headers: {
                        Authorization: token
                    },
                });
                // const getDayName = (date) => {
                //   const dayNames = ['일요일', '월요일', '화요일', '수요일', '목요일', '금요일', '토요일'];
                //   return dayNames[new Date(date).getDay()];
                // };

                // // 오전/오후 판단을 위한 함수
                // const getMeridiem = (time) => {
                //   const hour = parseInt(time.split(':')[0], 10);
                //   return hour < 12 ? '오전' : '오후';
                // };

                // // 데이터를 변환하여 새로운 배열을 만듭니다.
                // const formattedData = response.data.map(item => ({
                //   ...item,
                //   dayName: getDayName(item.date), // 요일
                //   meridiem: getMeridiem(item.time), // 오전/오후
                // }));
                // 응답 데이터 설정
                setRecords(response.data); // axios는 자동으로 응답을 JSON으로 파싱합니다.

            } catch (error) {
                console.error("Failed to fetch records: ", error);
            }
        };

        fetchRecords();
    }, [selectedDetail]); // period와 selectedDetail에 따라 요청을 다시 실행

    const calculateSumForSelectedPeriod = () => {
        // 선택된 기간에 맞는 레코드만 필터링
        const filteredRecords = records.filter(record => {
            // 날짜 포맷을 moment 객체로 변환
            const recordDate = moment(record.date, 'YYYY-MM-DD');
            let isInPeriod = false;

            switch (period) {
                case 'weekly':
                    // 선택된 주와 같은 주인지 확인
                    isInPeriod = recordDate.isSame(moment(selectedDetail, 'YYYY-MM-DD'), 'isoWeek');
                    break;
                case 'monthly':
                    // 선택된 달과 같은 달인지 확인
                    isInPeriod = recordDate.isSame(moment(selectedDetail, 'YYYY-MM'), 'month');
                    break;
                case 'yearly':
                    // 선택된 해와 같은 해인지 확인
                    isInPeriod = recordDate.isSame(moment(selectedDetail, 'YYYY'), 'year');
                    break;
                default:
                    // 'all' 선택 시 모든 레코드 포함
                    isInPeriod = true;
            }

            return isInPeriod;
        });

        const selectedItemCount = filteredRecords.length;

        // 칼로리 총합 계산
        const totalCalories = filteredRecords.reduce((acc, curr) => acc + parseFloat(curr.calorie), 0);
        const totalExerciseCount = filteredRecords.reduce((acc, curr) => acc + parseFloat(curr.exerciseCount), 0);
        return { selectedItemCount, totalCalories, totalExerciseCount };

    };


    return (
        <div>
            <h2>나의 운동 기록</h2>
            <select value={period} onChange={(e) => setPeriod(e.target.value)}>
                <option value="weekly">주별</option>
                <option value="monthly">월별</option>
                <option value="yearly">연별</option>
                <option value="all">전체 기간</option>
            </select>
            <select value={selectedDetail} onChange={(e) => setSelectedDetail(e.target.value)}>
                {generateDetailOptions(period, startDate).map((option) => (
                    <option key={option.value} value={option.value}>{option.label}</option>
                ))}
            </select>

            {/* 여기서부터 exerciseType에 따라 변경되는 부분 시작 */}
            {exerciseType === 'squat' && (
                <div className="activity-summary">
                    <div className="total-SquatCount">
                        <span className="number">{summary.totalExerciseCount}</span><br />
                        <span className="label">스쿼트 횟수</span>
                    </div>
                    <div className="exercise-stats-container">
                        <div className="stat">
                            <span className="number">{summary.selectedItemCount}</span><br />
                            <span className="label">스쿼트</span>
                        </div>
                        <div className="stat">
                            <span className="number">{summary.totalCalories}</span><br />
                            <span className="label">소모 칼로리</span>
                        </div>
                    </div>
                </div>
            )}

            {exerciseType === 'squat' && (
                <div className="exercise-record-container">
                    {records.length > 0 ? (
                        records.map((item, index) => (
                            
                                <div key={index} className="record-item">
                                    <img src={defaultImage} alt="Run" className="record-img" />
                                    <div className="record-details">
                                        <div className="record-full-date">
                                            {`${new Date(item.date).getFullYear()}년 ${new Date(item.date).getMonth() + 1}월 ${new Date(item.date).getDate()}일`}
                                        </div>
                                        <div className="record-date">
                                            {`${item.dayName} ${item.meridiem}`}
                                        </div>
                                        <div className="record-stats">
                                        <span className="record-exercise-count">{item.exerciseCount} 회</span>
                                        <span className="record-calorie">{item.calorie}칼로리</span>
                                        </div>
                                    </div>
                                </div>
                         
                        ))
                    ) : (
                        <p>운동 기록이 없습니다.</p>
                    )}
                </div>
            )}

            {exerciseType === 'situp' && (
                <div className="activity-summary">
                    <div className="total-SquatCount">
                        <span className="number">{summary.totalExerciseCount}</span><br />
                        <span className="label">싯업 횟수</span>
                    </div>
                    <div className="exercise-stats-container">
                        <div className="stat">
                            <span className="number">{summary.selectedItemCount}</span><br />
                            <span className="label">윗몸일으키기</span>
                        </div>
                        <div className="stat">
                            <span className="number">{summary.totalCalories}</span><br />
                            <span className="label">소모 칼로리</span>
                        </div>
                    </div>
                </div>
            )}

            {exerciseType === 'situp' && (
                <div className="exercise-record-container">
                    {records.length > 0 ? (
                        records.map((item, index) => (
                           
                                <div key={index} className="record-item">
                                    <img src={defaultImage} alt="Run" className="record-img" />
                                    <div className="record-details">
                                        <div className="record-full-date">
                                            {`${new Date(item.date).getFullYear()}년 ${new Date(item.date).getMonth() + 1}월 ${new Date(item.date).getDate()}일`}
                                        </div>
                                        <div className="record-date">
                                            {`${item.dayName} ${item.meridiem}`}
                                    
                                        </div>
                                        <div className="record-stats">
                                            <span className="record-exercise-count">{item.exerciseCount} 회</span>
                                            <span className="record-calorie">{item.calorie}칼로리</span>
                                        </div>
                                    </div>
                                </div>
                           
                        ))
                    ) : (
                        <p>운동 기록이 없습니다.</p>
                    )}
                </div>
            )}

            {exerciseType === 'pushup' && (
                <div className="activity-summary">
                    <div className="total-SquatCount">
                        <span className="number">{summary.totalExerciseCount}</span><br />
                        <span className="label">푸시업 횟수</span>
                    </div>
                    <div className="exercise-stats-container">
                        <div className="stat">
                            <span className="number">{summary.selectedItemCount}</span><br />
                            <span className="label">팔굽혀펴기</span>
                        </div>
                        <div className="stat">
                            <span className="number">{summary.totalCalories}</span><br />
                            <span className="label">소모 칼로리</span>
                        </div>
                    </div>
                </div>
            )}

            {exerciseType === 'pushup' && (
                <div className="exercise-record-container">
                    {records.length > 0 ? (
                        records.map((item, index) => (
                          
                                <div key={index} className="record-item">
                                    <img src={defaultImage} alt="Run" className="record-img" />
                                    <div className="record-details">
                                        <div className="record-full-date">
                                            {`${new Date(item.date).getFullYear()}년 ${new Date(item.date).getMonth() + 1}월 ${new Date(item.date).getDate()}일`}
                                        </div>
                                        <div className="record-date">
                                            {`${item.dayName} ${item.meridiem}`}
                                        </div>
                                        <div className="record-stats">
                                            <span className="record-exercise-count">{item.exerciseCount} 회</span>
                                            <span className="record-calorie">{item.calorie}칼로리</span>
                                        </div>
                                    </div>
                                </div>
                          
                        ))
                    ) : (
                        <p>운동 기록이 없습니다.</p>
                    )}
                </div>
            )}
        </div>
    );
};

export default ExerciseRecords;
