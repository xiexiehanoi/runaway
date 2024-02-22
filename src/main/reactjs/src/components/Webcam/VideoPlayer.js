import React from 'react';

const VideoPlayer = (src, width, height) => {
    return (
        <video autoPlay src={src.src} type="video/mp4"
            style={{
                objectFit: "cover",
                width: '100%', height: '100%',
                borderRadius: "8px 8px 8px 8px",

            }}
        />
    );
};

export default VideoPlayer;
