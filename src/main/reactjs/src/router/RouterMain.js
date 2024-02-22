import React, { useEffect } from 'react';
import Running from '../components/running/Running';
import WebCam from '../components/Webcam/WebCam';
import { Navigate, Route, Routes } from 'react-router-dom';
import MyPage from '../components/profile/Mypage';
import LoginPage from '../components/login/LoginPage';
import GoogleLogin from '../components/login/GoogleLogin';
import NaverLogin from '../components/login/NaverLogin';
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
import KakaoLoginCallback from "../components/login/KakaoLoginCallback";
import Ranking from '../components/rank/Ranking';
import RunningRecordDetail from '../components/profile/RunningRecordDetail';

import MyChallengeList from '../components/challenge/MyChallengeList';

import { useRecoilValue } from "recoil";
import { LoginAtom } from "../global/LoginAtom";
import RunningRecord from '../components/profile/RunningRecord';
import LoginRouter from "./LoginRouter";
const MyPageWithAlert = () => {
    const isLogin = useRecoilValue(LoginAtom);

    useEffect(() => {
        // my 페이지에 접근할 때만 alert 창 띄우기
        if (isLogin === null) {
            alert('로그인 해주세요');
        }
    }, [isLogin]);

    // my 페이지에 접근할 때만 MyPage 컴포넌트 렌더링
    return isLogin === null ? <Navigate to="/login" /> : <MyPage />;
};

const RouterMain = () => {
    return (
        <MainLayout>
            <Routes>
                <Route path="login/oauth2/callback/*" element={<KakaoLoginCallback />} />
                <Route path="/signup" element={<SignUpForm />} />
                <Route path="/login" element={<LoginPage />} />

                <Route path="/running" element={<LoginRouter><Running /> </LoginRouter>} />
                <Route path="/runningchallenge" element={<LoginRouter><RunningChallenge /></LoginRouter>} />
                <Route path="/exercise" element={<LoginRouter><Exercise /></LoginRouter>} />
                <Route path="/exercisechallenge" element={<LoginRouter><ExerciseChallenge /></LoginRouter>} />
                <Route path="/my" element={<LoginRouter><MyPageWithAlert /></LoginRouter>} />
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

                <Route path="/" element={<LoginRouter><Home /></LoginRouter>} />
            </Routes>
        </MainLayout>

    );
};

export default RouterMain;