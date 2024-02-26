import React from 'react';

import axios from "axios";
import runawayimg from "../image/runaway.png";
//import situpImage from '../image/sit-up.png';
import pushupImage from '../image/push-up.png';
//import squatImage from '../image/squat.png';
//import plusButton from '../image/plus-button.png';
import { Link } from 'react-router-dom';

import "../CSS/Main.css";

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
            <div className="header-inscreen">

                <span style={{fontFamily:'Anton' ,marginLeft: "8%" }}>Runaway</span>
                
            </div>   
        
        <div className='startAnimation'>
                
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