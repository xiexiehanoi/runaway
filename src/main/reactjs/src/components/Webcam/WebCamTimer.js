import React from 'react';

const WebCamTimer = ({ elapsedTime }) => {
    return (
        <div className="WebCamTimer">{elapsedTime} seconds</div>
    );
};

export default WebCamTimer;