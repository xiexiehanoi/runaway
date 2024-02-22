import React from 'react';
import Running from '../components/running/Running';
import WebCam from '../components/Webcam/WebCam';
import { Route, Routes } from 'react-router-dom';
import MyPage from '../components/profile/Mypage';
import LoginPage from '../components/login/LoginPage';
import MainLayout from '../components/MainLayout';
import Home from '../components/Home';
import Exercise from '../components/exercise/Exercise';
import ExerciseChallenge from '../components/challenge/ExerciseChallenge';
import RunningChallenge from '../components/challenge/RunningChallenge';
import SignUpForm from '../components/signup/SignUpForm';
import Squat from '../components/exercise/squat/Squat';
import Situp from '../components/exercise/situp/Situp';
import Pushup from '../components/exercise/pushup/Pushup';
import ChallengeMain from '../components/challenge/ChallengeMain';
import SocialLoginCallback from "../components/login/SocialLoginCallback";
import Ranking from '../components/rank/Ranking';
import RunningRecordDetail from '../components/profile/RunningRecordDetail';
import SignUpAddForm from "../components/signup/SignUpAddForm";
import MyChallengeList from '../components/challenge/MyChallengeList';
import RunningRecord from '../components/profile/RunningRecord';
import LoginRouter from "./LoginRouter";
import LoginBackRouter from "./LoginBackRouter";

const RouterMain = () => {
    return (
        <MainLayout>       
            <Routes>
                {/* 로그인 안된 상태 라우팅*/}
                <Route path="login/oauth2/callback/*" element={<SocialLoginCallback />} />
                <Route path="/signup" element={<LoginBackRouter><SignUpForm /></LoginBackRouter>} />
                <Route path="/login" element={<LoginBackRouter><LoginPage /></LoginBackRouter>} />

                {/* 로그인 된 상태 라우팅*/}
                <Route path="/running" element={<LoginRouter><Running /> </LoginRouter>} />
                <Route path="/runningchallenge" element={<LoginRouter><RunningChallenge /></LoginRouter>} />
                <Route path="/exercise" element={<LoginRouter><Exercise /></LoginRouter>} />
                <Route path="/exercisechallenge" element={<LoginRouter><ExerciseChallenge /></LoginRouter>} />
                <Route path="/my" element={<LoginRouter><MyPage /></LoginRouter>} />
                <Route path='/runningRecord' element={<LoginRouter><RunningRecord /></LoginRouter>} />
                <Route path="/runningRecordDetail/:runIdx" element={<LoginRouter><RunningRecordDetail /></LoginRouter>} />
                <Route path="/story" element={<LoginRouter><WebCam /></LoginRouter>} />
                <Route path="/squat" element={<LoginRouter><Squat /></LoginRouter>} />
                <Route path="/situp" element={<LoginRouter><Situp /></LoginRouter>} />
                <Route path="/pushup" element={<LoginRouter><Pushup /></LoginRouter>} />
                <Route path="/challengemain" element={<LoginRouter><ChallengeMain /></LoginRouter>} />
                <Route path="/home" element={<LoginRouter><Home /></LoginRouter>} />
                <Route path="/ranking" element={<LoginRouter><Ranking /></LoginRouter>} />
                <Route path="/mychallengelist" element={<LoginRouter><MyChallengeList /></LoginRouter>} />
                <Route path="/signup-add" element={<LoginRouter><SignUpAddForm /></LoginRouter>} />

                {/* /가 항상 제일 마지막*/}
                <Route path="/" element={<LoginRouter><Home /></LoginRouter>} />
            </Routes>
        </MainLayout>
        
    );
};

export default RouterMain;