import React from 'react';

const VideoPlayer = ({ src }) => {

    // 너비와 높이 중 작은 값을 기준으로 비율을 유지하면서 100%로 설정합니다.
    // const aspectRatio = Math.min(width, height) / Math.max(width, height) * 100;

    return (
        <div style={{
            width: '100%',
            height: '100%',
            position: 'relative',
            overflow: 'hidden',
            borderRadius: '8px'
        }}>
            <video autoPlay loop src={src} type="video/mp4"
                style={{
                    // width: `${aspectRatio}%`,
                    width: '100%',
                    height: '100%',
                    // height: `${aspectRatio}%`,
                    objectFit: 'cover'
                    // borderRadius: "8px 8px 0px 0px"
                    // position: 'absolute',
                    // top: '50%',
                    // left: '50%',
                    // transform: 'translate(-50%, -50%)'
                }}
            />
        </div>
    );
};

export default VideoPlayer;
