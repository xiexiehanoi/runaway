import React from 'react';
import Navbar from './Navbar';
import axios from "axios";
const Home = () => {
    var token = window.localStorage.getItem('token');
    if (token) {
        console.log("Token found:", token);
        (async () => {
            try {
                const request = {
                    method: "GET",
                    url: "https://localhost:9002/api/login/me",
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