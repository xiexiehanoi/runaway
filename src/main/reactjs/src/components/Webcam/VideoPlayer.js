import React from 'react';

const VideoPlayer = ({ src, mimeType, currentStory }) => {

    // 너비와 높이 중 작은 값을 기준으로 비율을 유지하면서 100%로 설정합니다.
    // const aspectRatio = Math.min(width, height) / Math.max(width, height) * 100;

    return (
        <>
            {/* <video autoPlay loop src={src} type="video/mp4" */}
            <video autoPlay loop src={src} type={mimeType}
                style={{
                    objectFit: "cover",
                    width: '100%', height: '100%',
                    borderRadius: "8px 8px 8px 8px",

                }}
            />
            <div className="primaryCard storyInfoContainer"
                style={{
                    borderRadius: "16px 16px 8px 8px",
                    backgroundColor: 'rgba(70, 72, 75, 0.5)',
                    boxShadow: 'none'
                }}>
                <img alt='storyProfileImg' src=''
                    className='storyProfileImg' />

                <p className="storyInfo1">
                    User: {currentStory.user.username}
                </p>
                <p className="storyInfo2">
                    {currentStory.storyUploadTime}
                </p>
            </div>
        </>
    );
};

export default VideoPlayer;
