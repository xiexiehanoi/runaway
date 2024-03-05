import React, { useEffect, useState } from 'react';
import '../../CSS/WebCamStyle.css';
import '../../CSS/CommonApplicationStyle.css';
import { CSSTransition } from 'react-transition-group';
import WebcamVideo from "./WebCamVideo";
import StoryShow from "./StoryShow";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import ScreenHeader from "../../router/ScreenHeader";

const BASE_URI = process.env.REACT_APP_BACKEND_URL;
const token = window.localStorage.getItem("token");

const WebCam = () => {
    const [showWebCamVideo, setShowWebCamVideo] = useState(false);
    const [storyList, setStoryList] = useState([]);
    const [showHeader, setShowHeader] = useState(true);
    // const [closeClicked, setCloseClicked] = useState(false);
    const navi = useNavigate();


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
        navi("/addstory");
        window.location.href = "/addstory";
    };

    // // CloseWebCam 함수 수정
    // const CloseWebCam = () => {
    //     if (!closeClicked) {
    //         setCloseClicked(true);
    //         setShowWebCamVideo(false);
    //         setShowHeader(true);
    //     }
    // };


    return (
        <>
            {/* Header 표시 여부에 따라 조건부 렌더링 */}
            {showHeader && (
                <ScreenHeader title={"Stories"} />
            )}

            {!showWebCamVideo && (
                <button className='btn primaryButton-outset addStory'
                    style={{ margin: "7% 12%", width: '76%' }}
                    onClick={handleVideoButtonClick}>
                    <span
                        style={{
                            color: '#f5f5f5',
                            fontWeight: '500',
                            fontSize: '1.1em'
                        }}
                    >Add Story</span>
                </button>
            )}

            <span className='CommonContainer' style={{ width: '100%', height: '100%' }}>
                <CSSTransition
                    in={showWebCamVideo}
                    timeout={800}
                    classNames="webcam-slide"
                    style={{ width: '100%', height: '100%' }}
                    unmountOnExit
                >
                    <div id='WebCamVideo' className={`WebCamApp ${showWebCamVideo ? 'show' : ''}`}
                        style={{ width: '100%', height: '100%', borderRadius: '8px 8px 0px 0px' }}
                    >
                        <WebcamVideo />
                    </div>
                </CSSTransition>
                {!showWebCamVideo && (
                    <div className='primaryCard'
                        style={{
                            width: '85%',
                            height: '72%',
                            margin: " auto",
                            position: 'relative'
                        }}>
                        <StoryShow storyList={storyList} />
                    </div>
                )}
            </span>
        </>
    );
};

export default WebCam;