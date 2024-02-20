import React, { useEffect, useState } from 'react';
import './WebCamStyle.css';
// import WebCamImage from "./WebCamImage";
import WebcamVideo from "./WebCamVideo";
import StoryShow from "./StoryShow";
import axios from 'axios';


const WebCam = () => {
    const [showWebCamVideo, setShowWebCamVideo] = useState(false);
    const [storyList, setStoryList] = useState([]);

    const BASE_URI = process.env.REACT_APP_BACKEND_URL;
    // const token = window.localStorage.getItem("token");

    const list = () => {
        axios.get(`${BASE_URI}/api/story/list`)
            .then(res => {
                setStoryList(res.data)
            })
    }

    useEffect(() => {
        list();
    }, []);

    // const onDelete = (story_num) => {

    // }

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
                    <WebcamVideo />
                ) : (
                    storyList.map((item, idx) => (
                        <StoryShow key={idx} item={item} />
                    ))
                )}
            </span>
        </>
    );
};

export default WebCam;