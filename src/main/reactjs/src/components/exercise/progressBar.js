import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import './progressBarStyle.css'; // CSS 파일을 import 합니다.

const ProgressBar = ({ maxCount, count }) => {
  const ref = useRef();

  useEffect(() => {
    const radius = 50;
    const border = 2;
    const padding = 30;
    const boxSize = (radius + padding) * 2;
    const twoPi = Math.PI * 2;
    const progress = count / maxCount;

    // SVG 요소가 이미 존재하면 제거
    d3.select(ref.current).select('svg').remove();

    const arc = d3.arc()
      .startAngle(0)
      .innerRadius(radius)
      .outerRadius(radius - border);

    const svg = d3.select(ref.current)
      .append('svg')
      .attr('width', boxSize)
      .attr('height', boxSize);

    const g = svg.append('g')
      .attr('transform', `translate(${boxSize / 2}, ${boxSize / 2})`);

    g.append('path')
      .attr('class', 'background')
      .attr('fill', '#ccc')
      .attr('d', arc.endAngle(twoPi));

    // 명암 적용을 위한 그라데이션 동적 변경
    const color = d3.scaleLinear()
      .domain([0, 0.5, 1])
      .range(['#303234', '#505050', '#000000']); // 어두운 계열로 변경

    g.append('path')
      .attr('class', 'foreground')
      .attr('fill', color(progress)) // 동적으로 색상 적용
      .attr('d', arc.endAngle(twoPi * progress));

    g.append('text')
      .attr('fill', '#ffffff') // 텍스트 색상
      .attr('text-anchor', 'middle')
      .attr('dy', '.35em')
      .text(`${Math.round(progress * 100)}%`);
  }, [maxCount, count]);

  return <div ref={ref} id="progress-content"></div>;
};

export default ProgressBar;
