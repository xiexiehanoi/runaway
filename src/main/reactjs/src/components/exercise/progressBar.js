import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import './progressBarStyle.css'; // CSS 파일을 import 합니다.

const ProgressBar = ({ maxCount, count }) => {
  const ref = useRef();

  useEffect(() => {
    const radius = 50;
    const border = 3;
    const padding = 30;
    const boxSize = (radius + padding) * 2;
    const twoPi = Math.PI * 2;

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

    const defs = svg.append('defs');

    // 그라데이션 정의
    const gradient = defs.append('linearGradient')
        .attr('id', 'gradient')
        .attr('x1', '0%')
        .attr('y1', '0%')
        .attr('x2', '100%')
        .attr('y2', '100%')
        .attr('spreadMethod', 'pad');

    gradient.append('stop')
        .attr('offset', '0%')
        .attr('stop-color', '#000000') // 검정색 시작
        .attr('stop-opacity', 1);

    // 그라데이션 중간 지점 추가
    gradient.append('stop')
        .attr('offset', '50%') // 중간 지점
        .attr('stop-color', '#505050') // 중간 색상을 더 밝은 회색으로 설정
        .attr('stop-opacity', 1);

    gradient.append('stop')
        .attr('offset', '100%')
        .attr('stop-color', '#303234') // 검정색 명암 끝
        .attr('stop-opacity', 1);

    const g = svg.append('g')
        .attr('transform', `translate(${boxSize / 2}, ${boxSize / 2})`);

    g.append('path')
        .attr('class', 'background')
        .attr('fill', '#ccc')
        .attr('fill-opacity', 0.5)
        .attr('d', arc.endAngle(twoPi));

    const progress = count / maxCount;

    g.append('path')
        .attr('class', 'foreground')
        .attr('fill', 'url(#gradient)') // 그라데이션 적용
        .attr('d', arc.endAngle(twoPi * progress));

    g.append('text')
        .attr('fill', '#000000') // 글자색을 검정색으로 변경
        .attr('text-anchor', 'middle')
        .attr('dy', '.35em')
        .text(`${Math.round(progress * 100)}%`);

  }, [maxCount, count]);

  return <div ref={ref} id="progress-content"></div>;
};

export default ProgressBar;
