import React, { useEffect, useState } from 'react';
// import './WebCamStyle.css';
import '../../CSS/WebCamStyle.css';
import '../../CSS/CommonApplicationStyle.css';
// import WebCamImage from "./WebCamImage";
import WebcamVideo from "./WebCamVideo";
import StoryShow from "./StoryShow";
import axios from 'axios';

const BASE_URI = process.env.REACT_APP_BACKEND_URL;
const token = window.localStorage.getItem("token");

const WebCam = () => {
    const [showWebCamVideo, setShowWebCamVideo] = useState(false);
    const [storyList, setStoryList] = useState([]);


    const list = () => {
        // axios.get(`${BASE_URI}/api/story/list`)
        //     .then(res => {
        //         setStoryList(res.data)
        //     }, {
        //         headers: {
        //             Authorization: token
        //         }
        //     })

        axios.get(`${BASE_URI}/api/story/list`, {
            headers: {
                Authorization: `Bearer ${token}` // 'Bearer' 키워드를 추가해야 합니다.
            }
        })
            .then(res => {
                setStoryList(res.data);
            })
            .catch(error => {
                console.error("Error fetching story list:", error);
            });
    }

    useEffect(() => {
        list();
    }, []);

    // const onDelete = (story_num) => {

    // }

    const handleVideoButtonClick = () => {
        setShowWebCamVideo(true);
    };

    // const handleShowButtonClick = () => {
    //     setShowWebCamVideo(false);
    // };


    return (
        <>
            <div class="header-inscreen">
                <span style={{ marginLeft: "8%" }}>Stories</span>
            </div>
            <button className='btn primaryButton-outset' style={{ margin: "5% 8%" }}
                onClick={handleVideoButtonClick}><span class="primaryCard-text">Video</span>
            </button>
            {/* <button className='btn btn-success'
                onClick={handleShowButtonClick}>Show
            </button> */}
            {/* <span className='WebCamApp'> */}
            <span className='CommonContainer'>
                {/* <h4 className='alert alert-info'>Webcam</h4> */}
                {/* <WebCamImage /> */}
                {showWebCamVideo ? (
                    <span className='WebCamApp'>
                        <WebcamVideo />
                    </span>
                ) : (
                    <div className='primaryCard'
                        style={{ width: '85%', height: '72%', margin: " auto" }}>
                        <StoryShow storyList={storyList} />
                    </div>
                )}
            </span>
        </>
    );
};

export default WebCam;