import React from 'react';

const VideoPlayer = (src, width, height) => {
    return (
        <div style={{ width: `${width}%`, height: `${height}%` }}>
            <video autoPlay src={src.src} type="video/mp4"
                style={{
                    width: '100%', height: '80%',
                    borderRadius: "8px 8px 0px 0px",
                    maxHeight: '340px'
                }}
            />
        </div>
    );
};

export default VideoPlayer;
