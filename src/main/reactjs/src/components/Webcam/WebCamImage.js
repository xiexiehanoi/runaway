import Webcam from "react-webcam";
import React, { useState, useRef, useCallback } from "react";

function WebCamImage() {
    const webcamRef = useRef(null);
    const [img, setImg] = useState(null);

    const capture = useCallback(() => {
        const imageSrc = webcamRef.current.getScreenshot();
        setImg(imageSrc);
    }, [webcamRef]);

    const videoConstraints = {
        aspectRatio: 0.6666666667,
        facingMode: "user",
        width: { min: 480 },
        height: { min: 720 },
    };

    return (
        <div className="WebCamContainer">
            {img === null ? (
                <>
                    <Webcam
                        screenshotFormat="image/jpeg"
                        videoConstraints={videoConstraints}
                        audio={false}
                        height={480}
                        width={720}
                        ref={webcamRef}
                        mirrored={true}
                    />
                    <button className="WebCamBtn" onClick={capture}>Capture photo</button>
                </>
            ) : (
                <>
                    <img src={img} alt="screenshot" className="WebCamImg" />
                    <button className="WebCamBtn" onClick={() => setImg(null)}>Recapture</button>
                </>
            )}
        </div>
    );
}

export default WebCamImage;