import React from 'react';

const VideoPlayer = (src) => {
    return (
        <div >
            <video controls autoPlay src={src.src} type="video/mp4" />
        </div>
    );
};

export default VideoPlayer;
