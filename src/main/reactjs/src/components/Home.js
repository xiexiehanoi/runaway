import React from 'react';
import Navbar from './Navbar';
import axios from "axios";
const Home = () => {
    var token = window.localStorage.getItem('token');
    const BASE_URI = process.env.REACT_APP_BASE_URI;

    if (token) {
        console.log("Token found:", token);
        (async () => {
            try {
                const request = {
                    method: "GET",
                    url: `${BASE_URI}/api/login/me`,
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
            홈화면
            <Navbar/>
        </div>
    );
};

export default Home;