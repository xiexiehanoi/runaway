// import React, { useEffect, useRef, useState } from 'react';
// import { Chart as ChartJS, registerables } from 'chart.js';
// import { Line } from 'react-chartjs-2';
// ChartJS.register(...registerables);

// const MyChallengeMonthlyRecord = ({ currentMonthMyChallengeList }) => {
//     const [selectedTab, setSelectedTab] = useState('tab-1');
//     const [exerciseCounts, setExerciseCounts] = useState({
//         situp: { totalPlanned: 0, totalCompleted: 0 },
//         pushup: { totalPlanned: 0, totalCompleted: 0 },
//         squat: { totalPlanned: 0, totalCompleted: 0 },
//         running: { totalPlanned: 0, totalCompleted: 0 }, // 러닝 데이터 추가
//     });

//   const chartRef1 = useRef(null);
//   const chartRef2 = useRef(null);

//   useEffect(() => {
//     const chartInstance = chartRef1.current; 
//     if (chartInstance && chartInstance.ctx) {
//       const ctx = chartInstance.ctx;
//       const gradient = ctx.createLinearGradient(0, 0, ctx.canvas.width, 0);
//       gradient.addColorStop(0, 'rgba(199, 147, 233, 1)');
//       gradient.addColorStop(0.5, 'rgba(163, 102, 246, 1)');
//       gradient.addColorStop(1, 'rgba(148, 0, 211, 1)');
//       chartInstance.data.datasets[0].borderColor = gradient;
//       chartInstance.update();
//     }
//   }, []);

//   useEffect(() => {
//     const chartInstance2 = chartRef2.current; 
//     if (chartInstance2 && chartInstance2.ctx) {
//       const ctx = chartInstance2.ctx;
//       const gradient = ctx.createLinearGradient(0, 0, ctx.canvas.width, 0);
//       gradient.addColorStop(0, 'rgba(255, 215, 0, 1)'); 
//       gradient.addColorStop(0.5, 'rgba(255, 0, 0, 1)'); 
//       gradient.addColorStop(1, 'rgba(153, 50, 204, 1)'); 

//       chartInstance2.data.datasets[0].borderColor = gradient;
//       chartInstance2.update();
//     }
//   }, []);

//   const glowPlugin = {
//     id: 'glow',
//     beforeDatasetsDraw: (chart, easingValue, options) => {
//       const ctx = chart.ctx;
//       ctx.save(); 
//       ctx.shadowColor = 'rgba(255, 255, 255, 0.75)';
//       ctx.shadowBlur = 15;
//       ctx.shadowOffsetX = 0;
//       ctx.shadowOffsetY = 0;
//     },
//     afterDatasetsDraw: (chart, easingValue, options) => {
//       const ctx = chart.ctx;
//       ctx.restore(); 
//     }
//   };
//   ChartJS.register(glowPlugin);

//   const glowPlugin2 = {
//     id: 'glow',
//     beforeDatasetsDraw: (chart, easingValue, options) => {
//       const ctx = chart.ctx;
//       ctx.save();
//       ctx.shadowColor = 'rgba(255, 255, 255, 0.75)';
//       ctx.shadowBlur = 15;
//       ctx.shadowOffsetX = 0;
//       ctx.shadowOffsetY = 0;
//     },
//     afterDatasetsDraw: (chart, easingValue, options) => {
//       const ctx = chart.ctx;
//       ctx.restore();
//     }
//   };
//   ChartJS.register(glowPlugin2);

//   const data = {
//     labels: ['January', 'February', 'March', 'April', 'May', 'June'],
//     datasets: [
//       {
//         label: 'exercise frequency',
//         fill: false,
//         lineTension: 0.1,
//         borderCapStyle: 'butt',
//         borderDash: [],
//         borderDashOffset: 0.0,
//         borderJoinStyle: 'miter',
//         pointBorderColor: 'rgba(255,255,255,1)',
//         pointBackgroundColor: '#fff',
//         pointBorderWidth: 0,
//         pointHoverRadius: 5,
//         pointHoverBackgroundColor: 'rgba(255,255,255,1)',
//         pointHoverBorderColor: 'rgba(255,255,255,1)',
//         pointHoverBorderWidth: 1,
//         pointRadius: 1,
//         pointHitRadius: 10,
//         data: [21, 43 , 92, 67, 72, 77, 83],
//         borderWidth: 2,
//       }
//     ]
//   };

//   const data2 = {
//     labels: ['January', 'February', 'March', 'April', 'May', 'June'],
//     datasets: [
//       {
//         label: 'user percentage',
//         fill: false,
//         lineTension: 0.1,
//         borderCapStyle: 'butt',
//         borderDash: [],
//         borderDashOffset: 0.0,
//         borderJoinStyle: 'miter',
//         pointBorderColor: 'rgba(255,255,255,1)',
//         pointBackgroundColor: '#fff',
//         pointBorderWidth: 0,
//         pointHoverRadius: 5,
//         pointHoverBackgroundColor: 'rgba(255,255,255,1)',
//         pointHoverBorderColor: 'rgba(255,255,255,1)',
//         pointHoverBorderWidth: 1,
//         pointRadius: 1,
//         pointHitRadius: 10,
//         data: [65, 59, 80, 81, 56, 55, 40],
//         borderWidth: 2,
//       }
//     ]
//   };

//   const options = {
//     plugins: {
//       glow: {},
//       legend: {
//         display: true,
//         labels: {
//           usePointStyle: true,
//           boxWidth: 0, 
//         }
//       }
//     },
//     animation: {
//       duration: 2000, 
//       easing: 'easeOutBack'
//     },
//     hover: {
//       animationDuration: 1000, 
//     },
//     responsiveAnimationDuration: 500, 
//     elements: {
//       line: {
//         tension: 0 
//       }
//     }
//   };

//     useEffect(() => {
//         const summary = {
//             situp: { totalPlanned: 0, totalCompleted: 0 },
//             pushup: { totalPlanned: 0, totalCompleted: 0 },
//             squat: { totalPlanned: 0, totalCompleted: 0 },
//             running: { totalPlanned: 0, totalCompleted: 0 }, // 러닝 데이터 추가
//         };

//         currentMonthMyChallengeList.forEach((row) => {
//             const exerciseType = row.exerciseChallengeDto?.exercise_type?.toLowerCase() || "running"; // exercise_type이 없으면 running으로 간주
//             // 예시 데이터, 실제로는 row 객체에서 해당 값을 추출해야 함
//             const planned = row.exerciseChallengeDto.target_count; // 예정된 횟수
//             const completed = 1; // 실제 완료된 횟수

//             if (summary[exerciseType]) {
//                 summary[exerciseType].totalPlanned += planned;
//                 summary[exerciseType].totalCompleted += completed;
//             }
//         });

//         setExerciseCounts(summary);
//     }, [currentMonthMyChallengeList]);

//     const handleChange = (event) => {
//         setSelectedTab(event.target.id);
//     };
//     return (
//         <div>
//             <div className="segmented-control">
//                 <input
//                     type="radio"
//                     name="radio2"
//                     value="3"
//                     id="tab-1"
//                     checked={selectedTab === 'tab-1'}
//                     onChange={handleChange}
//                 />
//                 <label htmlFor="tab-1" className="segmented-control__1">
//                     <p>Running</p>
//                 </label>

//                 <input
//                     type="radio"
//                     name="radio2"
//                     value="4"
//                     id="tab-2"
//                     checked={selectedTab === 'tab-2'}
//                     onChange={handleChange}
//                 />
//                 <label htmlFor="tab-2" className="segmented-control__2">
//                     <p>Squat</p>
//                 </label>

//                 <input
//                     type="radio"
//                     name="radio2"
//                     value="5"
//                     id="tab-3"
//                     checked={selectedTab === 'tab-3'}
//                     onChange={handleChange}
//                 />
//                 <label htmlFor="tab-3" className="segmented-control__3">
//                     <p>Sit-Up</p>
//                 </label>

//                 <input
//                     type="radio"
//                     name="radio2"
//                     value="6"
//                     id="tab-4"
//                     checked={selectedTab === 'tab-4'}
//                     onChange={handleChange}
//                 />
//                 <label htmlFor="tab-4" className="segmented-control__3">
//                     <p>Push-Up</p>
//                 </label>
//                 <div className="segmented-control__color"></div>
//             </div>
//             <div className="currentMonthMyChallenge-container">
//                 <div className="graff-container">
//                     <Line ref={chartRef1} plugins={[glowPlugin]} data={data} options={options} className="graff" />
//                 </div>
//                 <div className="graff-container2">
//                     <Line ref={chartRef2} plugins={[glowPlugin2]} data={data2} options={options} className="graff2" />
//                 </div>
//             </div>

//         </div>
//     );
// };

// export default MyChallengeMonthlyRecord;