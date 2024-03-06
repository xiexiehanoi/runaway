import React from 'react';
import RunawayMaleImage from "../profile/Img/runaway_male_image.jpg";
import RunawayFemaleImage from "../profile/Img/runaway_female_image.jpg";

const VideoPlayer = ({ src, mimeType, currentStory }) => {

    // 너비와 높이 중 작은 값을 기준으로 비율을 유지하면서 100%로 설정합니다.
    // const aspectRatio = Math.min(width, height) / Math.max(width, height) * 100;
    const handleImageError = (e) => {
        if (currentStory.user.gender === 'male') {
            e.target.src = `${RunawayMaleImage}`;
        } else {
            e.target.src = `${RunawayFemaleImage}`;
        }
    };



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
            <div className="commonBackground storyInfoContainer"
                style={{
                    borderRadius: "16px 16px 8px 8px",
                    // backgroundColor: 'rgba(70, 72, 75, 0.5)',
                    boxShadow: 'none'
                }}>
                <img alt='storyProfileImg'
                    src={currentStory.user.imageUrl}
                    onError={handleImageError}
                    className='storyProfileImg' />

                <p className="storyInfo1">
                    {currentStory.user.username}
                </p>
                <p className="storyInfo2">
                    {currentStory.storyUploadTime}
                </p>
            </div>
        </>
    );
};

export default VideoPlayer;
