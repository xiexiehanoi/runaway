import React from 'react';
import Navbar from './Navbar';
const Home = () => {
    var token = window.localStorage.getItem('token');
    if (token) {
        console.log("Token found:", token);
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