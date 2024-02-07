import React from 'react';
import Running from '../components/running/Running';
import WebCam from '../components/Webcam/WebCam';
import { Route, Routes } from 'react-router-dom';
import MyPage from '../components/login/MyPage';
import LoginPage from '../components/login/LoginPage';
import KakaoLogin from '../components/login/KakaoLogin';
import GoogleLogin from '../components/login/GoogleLogin';
import NaverLogin from '../components/login/NaverLogin';
import MainLayout from '../components/MainLayout';
import Home from '../components/Home';
import Exercise from '../components/exercise/Exercise';
import ExerciseChallenge from '../components/challenge/ExerciseChallenge';
import RunningChallenge from '../components/challenge/RunningChallenge';
import SignUpForm from '../components/signup/SignUpForm';
import Squat from '../components/exercise/squat/Squat';
import ChallengeMain from '../components/challenge/ChallengeMain';
const RouterMain = () => {
    return (
        
       
        <MainLayout>       
            <Routes>
                <Route path="/home" element={<Home />} />
                <Route path="/" element={<Home />} />
                <Route path="/running" element={<Running />} />
                <Route path="/runningchallenge" element={<RunningChallenge />} />
                <Route path="/exercise" element={<Exercise />} />
                <Route path="/exercisechallenge" element={<ExerciseChallenge />} />
                <Route path="/my" element={<MyPage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/authkakao" element={<KakaoLogin />} />
                <Route path="/authgoogle" element={<GoogleLogin />} />
                <Route path="/authnaver" element={<NaverLogin />} />
                <Route path="/webcam" element={<WebCam />} />
                <Route path="/signup" element={<SignUpForm />} />
                <Route path="/squat" element={<Squat />} />
                <Route path="/situp" element={<Exercise />} />
                <Route path="/challengemain" element={<ChallengeMain/>}/>
            </Routes>
        </MainLayout>
        
    );
};

export default RouterMain;