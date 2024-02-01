import React from 'react';
import './WebCamStyle.css';
import Webcam from "react-webcam";

const WebCam = () => {
    return (
        <div>
            <h4 className='alert alert-info'>Webcam</h4>
            <div>
                <Webcam mirrored={true}/>
            </div>
        </div>
    );
};

export default WebCam;