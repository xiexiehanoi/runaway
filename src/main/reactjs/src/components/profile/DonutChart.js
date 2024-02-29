import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

const DonutChart = ({ successCount, failureCount ,pendingCount}) => {
  const chartRef = useRef(null);
    
  useEffect(() => {
    // 성공한 부분과 나머지 부분(실패 또는 미진행)을 계산
   
  
    const data = {
      // labels: ['Success', 'failureCount', 'pendingCount'],
      datasets: [{
        data: [successCount, failureCount, pendingCount], // 성공과 나머지 부분 데이터
        backgroundColor: ['rgba(75, 192, 192, 0.6)', 'rgba(255, 99, 132, 0.6)', 'rgba(166, 166, 166, 0.6)'],
        borderColor: ['rgba(75, 192, 192, 1)', 'rgba(255, 99, 132, 0.6)', 'rgba(166, 166, 166, 0.6)'],
        borderWidth: 1,
      }],
    };

    const config = {
      type: 'doughnut',
      data: data,
      options: {
        responsive: true,
        maintainAspectRatio: true,
        animation: {
          animateScale: true,
        },
        // 도넛 차트 내부에 텍스트 표시 등 추가 옵션 구성 가능
      },
    };

    if (chartRef.current) {
      const myChart = new Chart(chartRef.current, config);
      return () => myChart.destroy();
    }
  }, [successCount, failureCount,pendingCount]); // 의존성 배열에 totalDays 추가

  return <canvas ref={chartRef} />;
};

export default DonutChart;