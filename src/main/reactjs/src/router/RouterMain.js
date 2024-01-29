import React from 'react';
import Navbar from '../components/Navbar';
import Running from '../components/running/Running';
import { Route, Routes } from 'react-router-dom';

const RouterMain = () => {
    return (
        <div>
            <Navbar/>
            <Routes>
                <Route path="/running" element={<Running />}  />
            </Routes>
            <h4>개발 서버 배포 테스중입니다.</h4>
        </div>
    );
};

export default RouterMain;