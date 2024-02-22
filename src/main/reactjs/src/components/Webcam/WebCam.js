import React, { useEffect, useState } from 'react';
import '../../CSS/WebCamStyle.css';
import '../../CSS/CommonApplicationStyle.css';
import { CSSTransition } from 'react-transition-group';
import WebcamVideo from "./WebCamVideo";
import StoryShow from "./StoryShow";
import axios from 'axios';

const BASE_URI = process.env.REACT_APP_BACKEND_URL;
const token = window.localStorage.getItem("token");

const WebCam = () => {
    const [showWebCamVideo, setShowWebCamVideo] = useState(false);
    const [storyList, setStoryList] = useState([]);
    const [showHeader, setShowHeader] = useState(true);


    const list = () => {
        axios.get(`${BASE_URI}/api/story/list`, {
            headers: {
                Authorization: token
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
        setShowHeader(false);
    };

    const handleBackButtonClick = () => {
        setShowWebCamVideo(false);
        setShowHeader(true); // 뒤로 가기 버튼을 누르면 헤더 표시
    };


    return (
        <>
            {/* Header 표시 여부에 따라 조건부 렌더링 */}
            {showHeader && (
                <div className="header-inscreen">
                    <span style={{ marginLeft: "8%" }}>Stories</span>
                </div>
            )}

            {!showWebCamVideo && (
                <button className='btn primaryButton-outset'
                    style={{ margin: "7% 12%", width: '76%' }}
                    onClick={handleVideoButtonClick}>
                    <span
                        style={{
                            color: '#f5f5f5',
                            fontWeight: '500',
                            fontSize: '1em'
                        }}
                    >Add Story</span>
                </button>
            )}

            <span className='CommonContainer'>
                <CSSTransition
                    in={showWebCamVideo}
                    timeout={800}
                    classNames="webcam-slide"
                    unmountOnExit
                >
                    <div className={`WebCamApp ${showWebCamVideo ? 'show' : ''}`}>
                        <WebcamVideo BackButton={handleBackButtonClick} />
                    </div>
                </CSSTransition>
                {!showWebCamVideo && (
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