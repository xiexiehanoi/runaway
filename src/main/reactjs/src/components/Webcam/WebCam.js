import React from 'react';
import './WebCamStyle.css';
// import WebCamImage from "./WebCamImage";
import WebcamVideo from "./WebCamVideo";


const WebCam = () => {
    return (
        <div className='WebCamApp'>
            <h4 className='alert alert-info'>Webcam</h4>
            {/* <WebCamImage /> */}

            <WebcamVideo />
        </div>
    );
};

export default WebCam;