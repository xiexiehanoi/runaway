import React from 'react';

const VideoPlayer = ({ src, mimeType }) => {

    // 너비와 높이 중 작은 값을 기준으로 비율을 유지하면서 100%로 설정합니다.
    // const aspectRatio = Math.min(width, height) / Math.max(width, height) * 100;

    return (
        // <video autoPlay loop src={src} type="video/mp4"
        <video autoPlay loop src={src} type="mimeType"
            style={{
                objectFit: "cover",
                width: '100%', height: '100%',
                borderRadius: "8px 8px 8px 8px",

            }}
        />
    );
};

export default VideoPlayer;
