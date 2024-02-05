import React, { useState } from 'react';
import './WebCamStyle.css';
// import WebCamImage from "./WebCamImage";
import WebcamVideo from "./WebCamVideo";


const WebCam = () => {
    const [showWebCamVideo, setShowWebCamVideo] = useState(false);

    const handleVideoButtonClick = () => {
        setShowWebCamVideo(true);
    };

    return (
        <span className='WebCamApp'>
            {/* <h4 className='alert alert-info'>Webcam</h4> */}
            {/* <WebCamImage /> */}
            <span className='WebCamApp'>
                {showWebCamVideo ? (
                    <WebcamVideo />
                ) : (
                    <button className='btn btn-success'
                        onClick={handleVideoButtonClick}>Video</button>
                )}
            </span>
            {/* <WebcamVideo /> */}
        </span>
    );
};

export default WebCam;