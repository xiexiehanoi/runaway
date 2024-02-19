import React, { useState } from 'react';
import './WebCamStyle.css';
// import WebCamImage from "./WebCamImage";
import WebcamVideo from "./WebCamVideo";
import StoryShow from "./StoryShow";


const WebCam = () => {
    const [showWebCamVideo, setShowWebCamVideo] = useState(false);

    const handleVideoButtonClick = () => {
        setShowWebCamVideo(true);
    };

    const handleShowButtonClick = () => {
        setShowWebCamVideo(false);
    };


    return (
        <>
        <button className='btn btn-success'
                onClick={handleVideoButtonClick}>Video
        </button>
        <button className='btn btn-success'
                onClick={handleShowButtonClick}>Show
        </button>
        <span className='WebCamApp'>
                {/* <h4 className='alert alert-info'>Webcam</h4> */}
            {/* <WebCamImage /> */}
            {showWebCamVideo ? (
                <WebcamVideo/>
            ) : (
                <StoryShow />
            )}
        </span>
        </>
    );
};

export default WebCam;