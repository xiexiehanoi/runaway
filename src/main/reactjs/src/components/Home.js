import React from 'react';
import Navbar from './Navbar';
import axios from "axios";
import runawayimg from "../image/runaway.png";
import situpImage from '../image/situp.png';
import pushupImage from '../image/push-up.png';
import squatImage from '../image/squats.png';
import plusButton from '../image/plus-sign.png';
import { Link } from 'react-router-dom';
const Home = () => {
    var token = window.localStorage.getItem('token');
    const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

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
            <div class="header-inscreen">
                <span style={{fontFamily:'Anton' ,marginLeft: "8%" }}>Runaway</span>
                
            </div>   

            <div className="exercise-container" >
                <div className='exercise-content'  >
                        <img src={plusButton} alt="running" className="exercise-image" />    
                </div>
                <span style={{fontFamily:'Anton',fontSize: '300%'}}><Link to="/challengemain">challenge</Link></span>
            </div>

            <div style={{ display: 'flex' }}>
                <div className="exercise-container" >
                    <img src={runawayimg}  alt="running" className='exercise-image' />
                    <Link to="/running">Running</Link>
                </div>
                <div className="exercise-container" >
                <img src={situpImage}  alt="situp" className='exercise-image' />  
                <Link to={"/situp"}>Sit-UP</Link>
                </div>

            </div>

            <div style={{ display: 'flex' }}>
                <div className="exercise-container" >
                <img src={pushupImage}  alt="pushup" className='exercise-image' />
                <Link to={"/pushup"}>Push-UP</Link>
                
                
                </div>
                <div className="exercise-container" >
                <img src={squatImage}  alt="squat" className='exercise-image' />
                <Link to={"/squat"}>Squat</Link>
                
                </div>

            </div>

            {/* <Navbar/> */}
        </div>
    );
};

export default Home;