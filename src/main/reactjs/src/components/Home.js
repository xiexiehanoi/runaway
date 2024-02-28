import React from 'react';

import axios from "axios";
import runawayimg from "../image/runaway.png";
import situpImage from '../image/sit-up.png';
import pushupImage from '../image/push-up.png';
import squatImage from '../image/squat.png';
import plusButton from '../image/plus-button.png';
import background from '../image/running.jpg';
import { Link,  useNavigate} from 'react-router-dom';

import 'react-slideshow-image/dist/styles.css';
import {  Fade } from 'react-slideshow-image'; //Fade , Zoom,Slide

import "../CSS/Main.css";

const slideImages = [
    {
      url: 'https://images.unsplash.com/photo-1427384906349-30452365b5e8?dpr=2&auto=compress,format&fit=crop&w=1199&h=899&q=80&cs=tinysrgb&crop=',
      caption: 'Slide 1'
    },
    {
      url: 'https://images.unsplash.com/photo-1506710507565-203b9f24669b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1536&q=80',
      caption: 'Slide 2'
    },
    {
      url: 'https://images.unsplash.com/photo-1536987333706-fc9adfb10d91?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1500&q=80',
      caption: 'Slide 3'
    },
  ];

const divStyle ={
    display:'flex',
    alignItems: "center",
    justifyContent : "center",
    height : "100px",
    backgroundSize: "100% 100px", // 배경 이미지를 요소에 맞춰서 축소 또는 확대하여 모두 보이도록 설정  
}  


const Home = () => {
    var token = window.localStorage.getItem('token');
    const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
    const navi = useNavigate();

    if (token) {
        console.log("Token found:", token);
        (async () => {
            try {
                const request = {
                    method: "GET",
                    url: `${BACKEND_URL}/api/login/me`,
                    headers: {
                        Authorization: token
                    }
                }
                const res = await axios(request);
                if (res.data.height === null || res.data.height === 0 ||
                  res.data.weight === null || res.data.weight === 0) {
                    alert("추가 정보 입력이 필요하여 추가 정보 입력 페이지로 이동합니다.");
                    navi("/signup-add");
                }
                console.log(res);
            } catch (e) {
                console.error(e);
            }
        })();
    } else {
        console.log("Token not found.");
    }

    return (
    <div>
            <div className="header-inscreen">

                <span style={{fontFamily:'Anton' ,marginLeft: "8%" }}>Runaway</span>
                
            </div>   
        
        <div className='startAnimation'>

            
                <div className='slide-container' style={{width:'90%',borderRadius:'25px',marginLeft : "5%",marginBottom :"-30%",marginTop:"10%"}}>
                    <Fade>
                        {slideImages.map((image, index) =>(
                            <div key={index}>
                                <div style={{...divStyle, backgroundImage:`url(${image.url})` }}>
                                    
                                </div>
                            </div>
                        ))}
                    </Fade>
                </div>
            
            
                
            <Link to="/challengemain">
                <button className='btn primaryButton-outset'
                style={{ width:'90%',height:'100px',marginTop:'40%',marginLeft:'5%',marginRight:'5%'}}>
                    <span style={{color:'white' }}>My Challenge</span>
                </button>
            </Link>

            <div style={{ display: 'flex',marginBottom:'-1%' }}>  
                <div className="home-container" style={{ textAlign: 'center',height:'100px' }}>
                    
                        <Link to={"/running"}>
                            <img src={runawayimg}  alt="running" className='exercise-image' 
                            style={{  width: '50px', height: '50px', display: 'block', margin: '0 auto' }}/>
                            <span style={{color:'white' }}>Running</span>
                        </Link>
                      
                </div>
            </div>

            <div style={{ display: 'flex' }}>
                <div className="home-container" style={{ textAlign: 'center',height:'100px' }}>
                    <Link to={"/exercise"}>
                        <img src={pushupImage}  alt="pushup" className='exercise-image' 
                        style={{ width: '50px', height: '50px', display: 'block', margin: '0 auto' }}/>
                        <span style={{color:'white' }}>Exercise</span>
                    </Link>
                </div>

            </div>
        </div>
    </div>
    );
};

export default Home;