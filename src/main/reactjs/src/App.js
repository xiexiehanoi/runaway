import React from "react";
import './App.css';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Running from "./components/running/Running"
import Main from "./Main"
import WebCam from "./components/Webcam/WebCam";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Main />} />
                <Route path="/running" element={<Running />} />
                <Route path="/webcam" element={<WebCam />} />
            </Routes>
        </BrowserRouter>
    );
}
export default App;
