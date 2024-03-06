import React, { useState, useEffect } from 'react';
import moment from 'moment';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import Select from 'react-select';
import ScreenHeader from "../../router/ScreenHeader";


const ExerciseRecords = () => {
    const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
    const [period, setPeriod] = useState('monthly');
    const [selectedDetail, setSelectedDetail] = useState('');
    const [records, setRecords] = useState([]);
    const location = useLocation();
    const startDate = location.state?.startDate ? moment(location.state.startDate) : moment(); // 서버에서 받은 시작 날짜를 사용하거나 기본값으로 현재 날짜 설정
    const exerciseType = location.state?.exerciseType || 'running';
    const [summary, setSummary] = useState({ totalDistance: 0 });
    const [selectedTab, setSelectedTab] = useState('tab-2');

    useEffect(() => {
        const sum = calculateSumForSelectedPeriod();
        setSummary(sum);
    }, [records, selectedDetail, period]); // 의존성 배열에 records, selectedDetail, period 추가


    const formatDetailOption = (optionValue) => {
        // 현재 날짜와 비교할 moment 객체 생성
        const now = moment();
        const startOfWeek = now.startOf('isoWeek');
        const endOfWeek = now.endOf('isoWeek');
        const lastWeekStart = moment().subtract(1, 'weeks').startOf('isoWeek');
        const lastWeekEnd = moment().subtract(1, 'weeks').endOf('isoWeek');

        // 주어진 옵션의 시작과 끝 날짜 파싱
        const [start, end] = optionValue.split(' - ');
        const startDate = moment(start, "YYYY-MM-DD");
        const endDate = moment(end, "YYYY-MM-DD");

        // 이번 주인지 확인
        if (startDate.isSameOrAfter(startOfWeek) && endDate.isSameOrBefore(endOfWeek)) {
            return '이번 주';
        }

        // 지난 주인지 확인
        if (startDate.isSameOrAfter(lastWeekStart) && endDate.isSameOrBefore(lastWeekEnd)) {
            return '지난주';
        }

        // 날짜를 MM.DD 형식으로 변환
        return `${startDate.format('MM.DD')} - ${endDate.format('MM.DD')}`;
    };

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

                    // 옵션의 라벨을 변경하는 로직 추가
                    let label = formatDetailOption(`${startOfWeek.format('YYYY-MM-DD')} - ${endOfWeek.format('YYYY-MM-DD')}`);
                    options.push({
                        value: startOfWeek.format('YYYY-MM-DD'),
                        label: label
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
                const getDayName = (date) => {
                    const dayNames = ['일요일', '월요일', '화요일', '수요일', '목요일', '금요일', '토요일'];
                    return dayNames[new Date(date).getDay()];
                };

                // 데이터를 변환하여 새로운 배열을 만듭니다.
                const formattedData = response.data.map(item => ({
                    ...item,
                    dayName: getDayName(item.date), // 요일

                }));
                // 응답 데이터 설정
                setRecords(formattedData); // axios는 자동으로 응답을 JSON으로 파싱합니다.


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
        const calories = filteredRecords.reduce((acc, curr) => acc + parseFloat(curr.calorie), 0);
        const totalCalories = Number(calories.toFixed(1));
        const totalExerciseCount = filteredRecords.reduce((acc, curr) => acc + parseFloat(curr.exerciseCount), 0);
        return { selectedItemCount, totalCalories, totalExerciseCount };

    };

    const handleChange = (event) => {
        setSelectedTab(event.target.id);
        switch (event.target.value) {
            case 'weekly':
                setPeriod(event.target.value);
                break;
            case 'monthly':
                setPeriod(event.target.value);
                break;
            case 'yearly':
                setPeriod(event.target.value);
                break;
            case 'all':
                setPeriod(event.target.value);
                break;
            default:

                break;
        }
    };

    const options = generateDetailOptions(period, startDate).map(option => ({
        value: option.value,
        label: option.label
    }));


    return (
        <div>
            <div><ScreenHeader title={"My Profile"} /></div>
            <div className="segmented-control">
                <input
                    type="radio"
                    name="radio2"
                    value="weekly"
                    id="tab-1"
                    checked={selectedTab === 'tab-1'}
                    onChange={handleChange}
                />
                <label htmlFor="tab-1" className="segmented-control__1">
                    <p style={{ marginBottom: '0px' }}>주</p>
                </label>

                <input
                    type="radio"
                    name="radio2"
                    value="monthly"
                    id="tab-2"
                    checked={selectedTab === 'tab-2'}
                    onChange={handleChange}
                />
                <label htmlFor="tab-2" className="segmented-control__2">
                    <p style={{ marginBottom: '0px' }}>월</p>
                </label>

                <input
                    type="radio"
                    name="radio2"
                    value="yearly"
                    id="tab-3"
                    checked={selectedTab === 'tab-3'}
                    onChange={handleChange}
                />
                <label htmlFor="tab-3" className="segmented-control__3">
                    <p style={{ marginBottom: '0px' }}>년</p>
                </label>

                <input
                    type="radio"
                    name="radio2"
                    value="all"
                    id="tab-4"
                    checked={selectedTab === 'tab-4'}
                    onChange={handleChange}
                />
                <label htmlFor="tab-4" className="segmented-control__3">
                    <p style={{ marginBottom: '0px' }}>전체</p>
                </label>
                <div className="segmented-control__color"></div>
            </div>
            {exerciseType === 'squat' && (
                <>
                    <div className="exercise-summary-data" style={{ height: '150px' }}>
                        <div className="select-container" style={{ width: '160px' }}>
                            <Select
                                value={options.find(option => option.value === selectedDetail)}
                                onChange={selectedOption => setSelectedDetail(selectedOption.value)}
                                options={options}
                                styles={{
                                    control: (provided, state) => ({
                                        ...provided,
                                        backgroundColor: '#303234',
                                        color: '#f5f5f5', // 텍스트 색상을 흰색으로 설정 (필요한 경우)
                                        boxShadow: '3px 3px 8px 0px rgba(0, 0, 0, 0.30) inset',
                                        borderColor: state.isFocused ? '#yourFocusedBorderColor' : '#initialBorderColor',
                                        '&:hover': {
                                            borderColor: '#hoverBorderColor', // 마우스 호버 시 테두리 색상
                                        }
                                    }),
                                    singleValue: (provided) => ({
                                        ...provided,
                                        color: 'f5f5f5', // 선택된 항목의 텍스트 색상을 흰색으로 설정
                                    }),
                                    menu: (provided) => ({
                                        ...provided,
                                        backgroundColor: 'black', // 드롭다운 메뉴의 배경색을 검은색으로 설정
                                    }),
                                    option: (provided, state) => ({
                                        ...provided,
                                        backgroundColor: state.isFocused ? 'grey' : 'black', // 항목에 마우스를 올렸을 때의 배경색과 기본 배경색 설정
                                        color: 'f5f5f5', // 옵션의 텍스트 색상을 흰색으로 설정
                                    }),
                                }}
                            />
                        </div>
                        <div className="exercise-stats-container">
                            <div className="stat">
                                <span className="number">{summary.selectedItemCount}</span><br />
                                <span className="label">스쿼트</span>
                            </div>
                            <div className="stat">
                                <span className="number">{summary.totalExerciseCount}</span><br />
                                <span className="label">횟수</span>
                            </div>
                            <div className="stat">
                                <span className="number">{summary.totalCalories}</span><br />
                                <span className="label">칼로리</span>
                            </div>
                        </div>
                    </div>
                </>
            )}

            {exerciseType === 'squat' && (
                <div className="exercise-record-container">
                    {records.length > 0 ? (
                        records.sort((a, b) => new Date(b.date) - new Date(a.date))
                            .map((item, index) => (
                                <div key={index} className="exercise-record-item">
                                    <div className="record-details">
                                        <div className="record-full-date">
                                            {`${new Date(item.date).getFullYear()}년 ${new Date(item.date).getMonth() + 1}월 ${new Date(item.date).getDate()}일 ${item.dayName}`}
                                        </div>
                                        <div className="record-stats">
                                            <span className="record-exercise-count" style={{ marginRight: '20px' }}>{item.exerciseCount} 회</span>
                                            <span className="record-calorie">{item.calorie} 칼로리</span>
                                        </div>
                                    </div>
                                </div>

                            ))
                    ) : (
                        <p style={{ marginLeft: '20px' }}>운동 기록이 없습니다.</p>
                    )}
                </div>
            )}

            {exerciseType === 'situp' && (
                <>
                    <div className="exercise-summary-data" style={{ height: '150px' }}>
                        <div className="select-container" style={{ width: '160px' }}>
                            <Select
                                value={options.find(option => option.value === selectedDetail)}
                                onChange={selectedOption => setSelectedDetail(selectedOption.value)}
                                options={options}
                                styles={{
                                    control: (provided, state) => ({
                                        ...provided,
                                        backgroundColor: '#303234',
                                        color: '#f5f5f5', // 텍스트 색상을 흰색으로 설정 (필요한 경우)
                                        boxShadow: '3px 3px 8px 0px rgba(0, 0, 0, 0.30) inset',
                                        borderColor: state.isFocused ? '#yourFocusedBorderColor' : '#initialBorderColor',
                                        '&:hover': {
                                            borderColor: '#hoverBorderColor', // 마우스 호버 시 테두리 색상
                                        }
                                    }),
                                    singleValue: (provided) => ({
                                        ...provided,
                                        color: 'f5f5f5', // 선택된 항목의 텍스트 색상을 흰색으로 설정
                                    }),
                                    menu: (provided) => ({
                                        ...provided,
                                        backgroundColor: 'black', // 드롭다운 메뉴의 배경색을 검은색으로 설정
                                    }),
                                    option: (provided, state) => ({
                                        ...provided,
                                        backgroundColor: state.isFocused ? 'grey' : 'black', // 항목에 마우스를 올렸을 때의 배경색과 기본 배경색 설정
                                        color: 'f5f5f5', // 옵션의 텍스트 색상을 흰색으로 설정
                                    }),
                                }}
                            />
                        </div>
                        <div className="exercise-stats-container">
                            <div className="stat">
                                <span className="number">{summary.selectedItemCount}</span><br />
                                <span className="label">윗몸일으키기</span>
                            </div>
                            <div className="stat">
                                <span className="number">{summary.totalExerciseCount}</span><br />
                                <span className="label">횟수</span>
                            </div>
                            <div className="stat">
                                <span className="number">{summary.totalCalories}</span><br />
                                <span className="label">칼로리</span>
                            </div>
                        </div>
                    </div>
                </>
            )}

            {exerciseType === 'situp' && (
                <div className="exercise-record-container">
                    {records.length > 0 ? (
                        records.sort((a, b) => new Date(b.date) - new Date(a.date))
                            .map((item, index) => (
                                <div key={index} className="exercise-record-item">
                                    <div className="record-details">
                                        <div className="record-full-date">
                                            {`${new Date(item.date).getFullYear()}년 ${new Date(item.date).getMonth() + 1}월 ${new Date(item.date).getDate()}일 ${item.dayName}`}
                                        </div>
                                        <div className="record-stats">
                                            <span className="record-exercise-count">{item.exerciseCount} 회</span>
                                            <span className="record-calorie">{item.calorie} 칼로리</span>
                                        </div>
                                    </div>
                                </div>

                            ))
                    ) : (
                        <p style={{ marginLeft: '20px' }}>운동 기록이 없습니다.</p>
                    )}
                </div>
            )}

            {exerciseType === 'pushup' && (
                <>
                    <div className="exercise-summary-data" style={{ height: '150px' }}>
                        <div className="select-container" style={{ width: '160px' }}>
                            <Select
                                value={options.find(option => option.value === selectedDetail)}
                                onChange={selectedOption => setSelectedDetail(selectedOption.value)}
                                options={options}
                                styles={{
                                    control: (provided, state) => ({
                                        ...provided,
                                        backgroundColor: '#303234',
                                        color: '#f5f5f5', // 텍스트 색상을 흰색으로 설정 (필요한 경우)
                                        boxShadow: '3px 3px 8px 0px rgba(0, 0, 0, 0.30) inset',
                                        borderColor: state.isFocused ? '#yourFocusedBorderColor' : '#initialBorderColor',
                                        '&:hover': {
                                            borderColor: '#hoverBorderColor', // 마우스 호버 시 테두리 색상
                                        }
                                    }),
                                    singleValue: (provided) => ({
                                        ...provided,
                                        color: 'f5f5f5', // 선택된 항목의 텍스트 색상을 흰색으로 설정
                                    }),
                                    menu: (provided) => ({
                                        ...provided,
                                        backgroundColor: 'black', // 드롭다운 메뉴의 배경색을 검은색으로 설정
                                    }),
                                    option: (provided, state) => ({
                                        ...provided,
                                        backgroundColor: state.isFocused ? 'grey' : 'black', // 항목에 마우스를 올렸을 때의 배경색과 기본 배경색 설정
                                        color: 'f5f5f5', // 옵션의 텍스트 색상을 흰색으로 설정
                                    }),
                                }}
                            />
                        </div>
                        <div className="exercise-stats-container">
                            <div className="stat">
                                <span className="number">{summary.selectedItemCount}</span><br />
                                <span className="label">팔굽혀펴기</span>
                            </div>
                            <div className="stat">
                                <span className="number">{summary.totalExerciseCount}</span><br />
                                <span className="label">횟수</span>
                            </div>
                            <div className="stat">
                                <span className="number">{summary.totalCalories}</span><br />
                                <span className="label">칼로리</span>
                            </div>
                        </div>
                    </div>
                </>
            )}

            {exerciseType === 'pushup' && (
                <div className="exercise-record-container">
                    {records.length > 0 ? (
                        records.sort((a, b) => new Date(b.date) - new Date(a.date))
                            .map((item, index) => (

                                <div key={index} className="exercise-record-item">
                                    <div className="record-details">
                                        <div className="record-full-date">
                                            {`${new Date(item.date).getFullYear()}년 ${new Date(item.date).getMonth() + 1}월 ${new Date(item.date).getDate()}일 ${item.dayName}`}
                                        </div>
                                        <div className="record-stats">
                                            <span className="record-exercise-count">{item.exerciseCount} 회</span>
                                            <span className="record-calorie">{item.calorie} 칼로리</span>
                                        </div>
                                    </div>
                                </div>

                            ))
                    ) : (
                        <p style={{ marginLeft: '20px' }}>운동 기록이 없습니다.</p>
                    )}
                </div>
            )}
        </div>
    );
};

export default ExerciseRecords;
