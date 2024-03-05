import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import codepen from "./codepen.css";
import situpImage from "../../image/sit-up.png";
import pushupImage from "../../image/push-up.png";
import squatImage from "../../image/squat.png";
import { Chart as ChartJS, registerables } from 'chart.js';
import { Line } from 'react-chartjs-2';
import ScreenHeader from "../ScreenHeader";
ChartJS.register(...registerables);

const Exercise = () => {
  const chartRef1 = useRef(null);
  const chartRef2 = useRef(null);

  useEffect(() => {
    const chartInstance = chartRef1.current; 
    if (chartInstance && chartInstance.ctx) {
      const ctx = chartInstance.ctx;
      const gradient = ctx.createLinearGradient(0, 0, ctx.canvas.width, 0);
      gradient.addColorStop(0, 'rgba(199, 147, 233, 1)');
      gradient.addColorStop(0.5, 'rgba(163, 102, 246, 1)');
      gradient.addColorStop(1, 'rgba(148, 0, 211, 1)');
      chartInstance.data.datasets[0].borderColor = gradient;
      chartInstance.update();
    }
  }, []);

  useEffect(() => {
    const chartInstance2 = chartRef2.current; 
    if (chartInstance2 && chartInstance2.ctx) {
      const ctx = chartInstance2.ctx;
      const gradient = ctx.createLinearGradient(0, 0, ctx.canvas.width, 0);
      gradient.addColorStop(0, 'rgba(255, 215, 0, 1)'); 
      gradient.addColorStop(0.5, 'rgba(255, 0, 0, 1)'); 
      gradient.addColorStop(1, 'rgba(153, 50, 204, 1)'); 

      chartInstance2.data.datasets[0].borderColor = gradient;
      chartInstance2.update();
    }
  }, []);

  const glowPlugin = {
    id: 'glow',
    beforeDatasetsDraw: (chart, easingValue, options) => {
      const ctx = chart.ctx;
      ctx.save(); 
      ctx.shadowColor = 'rgba(255, 255, 255, 0.75)';
      ctx.shadowBlur = 15;
      ctx.shadowOffsetX = 0;
      ctx.shadowOffsetY = 0;
    },
    afterDatasetsDraw: (chart, easingValue, options) => {
      const ctx = chart.ctx;
      ctx.restore(); 
    }
  };
  ChartJS.register(glowPlugin);

  const glowPlugin2 = {
    id: 'glow',
    beforeDatasetsDraw: (chart, easingValue, options) => {
      const ctx = chart.ctx;
      ctx.save();
      ctx.shadowColor = 'rgba(255, 255, 255, 0.75)';
      ctx.shadowBlur = 15;
      ctx.shadowOffsetX = 0;
      ctx.shadowOffsetY = 0;
    },
    afterDatasetsDraw: (chart, easingValue, options) => {
      const ctx = chart.ctx;
      ctx.restore();
    }
  };
  ChartJS.register(glowPlugin2);

  const data = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June'],
    datasets: [
      {
        label: 'exercise frequency',
        fill: false,
        lineTension: 0.1,
        borderCapStyle: 'butt',
        borderDash: [],
        borderDashOffset: 0.0,
        borderJoinStyle: 'miter',
        pointBorderColor: 'rgba(255,255,255,1)',
        pointBackgroundColor: '#fff',
        pointBorderWidth: 0,
        pointHoverRadius: 5,
        pointHoverBackgroundColor: 'rgba(255,255,255,1)',
        pointHoverBorderColor: 'rgba(255,255,255,1)',
        pointHoverBorderWidth: 1,
        pointRadius: 1,
        pointHitRadius: 10,
        data: [21, 43 , 92, 67, 72, 77, 83],
        borderWidth: 2,
      }
    ]
  };

  const data2 = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June'],
    datasets: [
      {
        label: 'user percentage',
        fill: false,
        lineTension: 0.1,
        borderCapStyle: 'butt',
        borderDash: [],
        borderDashOffset: 0.0,
        borderJoinStyle: 'miter',
        pointBorderColor: 'rgba(255,255,255,1)',
        pointBackgroundColor: '#fff',
        pointBorderWidth: 0,
        pointHoverRadius: 5,
        pointHoverBackgroundColor: 'rgba(255,255,255,1)',
        pointHoverBorderColor: 'rgba(255,255,255,1)',
        pointHoverBorderWidth: 1,
        pointRadius: 1,
        pointHitRadius: 10,
        data: [65, 59, 80, 81, 56, 55, 40],
        borderWidth: 2,
      }
    ]
  };

  const options = {
    plugins: {
      glow: {},
      legend: {
        display: true,
        labels: {
          usePointStyle: true,
          boxWidth: 0, 
        }
      }
    },
    animation: {
      duration: 2000, 
      easing: 'easeOutBack'
    },
    hover: {
      animationDuration: 1000, 
    },
    responsiveAnimationDuration: 500, 
    elements: {
      line: {
        tension: 0 
      }
    }
  };

  
  return (
    <>
      <ScreenHeader title={"Exercise"} />

      <div className="exercisejs-container">
        <div className="squat-IconBox">
          <Link to={"/squat"} className="squatLink">
            <img src={squatImage} alt="Squat" className="exerciseSquat-image" />
          </Link>
        </div>

        <div className="situp-IconBox">
          <Link to={"/situp"} className="squatLink">
            <img src={situpImage} alt="Sit-up" className="exerciseSitup-image" />
          </Link>
        </div>
        <div className="pushup-IconBox">
          <Link to={"/pushup"} className="squatLink">
            <img src={pushupImage} alt="Pushup" className="exercisePushup-image" />
          </Link>
        </div>
      </div>

      <div className="graff-container">
        <Line ref={chartRef1} plugins={[glowPlugin]} data={data} options={options} className="graff"/>
      </div>
      <div className="graff-container2">
        <Line ref={chartRef2} plugins={[glowPlugin2]} data={data2} options={options} className="graff2"/>
      </div>
    </>
  );
};

export default Exercise;
