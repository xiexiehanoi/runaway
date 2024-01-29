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
        </div>
    );
};

export default RouterMain;