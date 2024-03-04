import React, { useState, useEffect } from 'react';
import moment from 'moment';
import { useLocation } from 'react-router-dom';
import axios from 'axios';

const ExerciseRecords = () => {
  const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
  const [period, setPeriod] = useState('monthly');
  const [selectedDetail, setSelectedDetail] = useState('');
  const [records, setRecords] = useState([]);
  const location = useLocation();
  const startDate = location.state?.startDate ? moment(location.state.startDate) : moment(); // 서버에서 받은 시작 날짜를 사용하거나 기본값으로 현재 날짜 설정

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
    // 선택된 기간에 따라 세부 옵션 생성
    const options = generateDetailOptions(period, startDate);
    setSelectedDetail(options.length > 0 ? options[0].value : '');
  }, [period, startDate]);

  useEffect(() => {
    const fetchRecords = async () => {
      try {
        // 로컬 스토리지에서 토큰 가져오기
        const token = window.localStorage.getItem("token");
        if (!token) {
          console.log("Token not found.");
          return;
        }

        // 선택된 기간과 세부사항을 쿼리에 포함
        const query = selectedDetail ? `&detail=${selectedDetail}` : '';
        // axios 요청
        const response = await axios.get(`${BACKEND_URL}/api/profile/running/recordss?period=${period}${query}`, {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`, // 토큰을 Authorization 헤더에 포함
          },
        });
        // 응답 데이터 설정
        setRecords(response.data); // axios는 자동으로 응답을 JSON으로 파싱합니다.
      } catch (error) {
        console.error("Failed to fetch records: ", error);
      }
    };

    fetchRecords();
  }, [period, selectedDetail]); // period와 selectedDetail에 따라 요청을 다시 실행

 

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
      <div>
        {records.length > 0 ? (
          records.map((record, index) => (
            <div key={index}>
              <p>날짜: {record.date}, 운동 횟수: {record.count}</p>
            </div>
          ))
        ) : (
          <p>운동 기록이 없습니다.</p>
        )}
      </div>
    </div>
  );
};

export default ExerciseRecords;
