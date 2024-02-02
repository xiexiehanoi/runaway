import React from 'react';
import './WebCamStyle.css';
// import WebCamImage from "./WebCamImage";
import WebcamVideo from "./WebCamVideo";


const WebCam = () => {
    return (
        <span className='WebCamApp'>
            {/* <h4 className='alert alert-info'>Webcam</h4> */}
            {/* <WebCamImage /> */}

            <WebcamVideo />
        </span>
    );
};

export default WebCam;