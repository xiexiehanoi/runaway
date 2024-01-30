import React from 'react';
import Navbar from '../components/Navbar';
import Running from '../components/running/Running';
import { Route, Routes } from 'react-router-dom';
import MyPage from '../components/login/MyPage';
import LoginPage from '../components/login/LoginPage';
import KakaoLogin from '../components/login/KakaoLogin';
import GoogleLogin from '../components/login/GoogleLogin';
import NaverLogin from '../components/login/NaverLogin';

const RouterMain = () => {
    return (
        <div>
            <Navbar/>
            <Routes>
                <Route path="/running" element={<Running />}  />
                <Route path="/my" element={<MyPage/>}/>
                <Route path="/login" element={<LoginPage />} />
                <Route path="/authkakao" element={<KakaoLogin />} />
                <Route path="/authgoogle" element={<GoogleLogin />} />
                <Route path="/authnaver" element={<NaverLogin />}/>
            </Routes>
        </div>
    );
};

export default RouterMain;