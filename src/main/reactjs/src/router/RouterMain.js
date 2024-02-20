import React from 'react';
import Running from '../components/running/Running';
import WebCam from '../components/Webcam/WebCam';
import {Route, Routes} from 'react-router-dom';
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
import NotLogin from "../global/login_redirect/NotLogin";
import RunningRecord from "../components/profile/RunningRecord";
import MyChallengeList from "../components/challenge/MyChallengeList";

const RouterMain = () => {
    return (
        <MainLayout>       
            <Routes>
                <Route path="login/oauth2/callback/*" element={<KakaoLoginCallback />} />
                <Route path="/home" element={<Home />} />
                <Route path="/running" element={<Running />} />
                <Route path="/runningchallenge" element={<RunningChallenge />} />
                <Route path="/exercise" element={<Exercise />} />
                <Route path="/exercisechallenge" element={<ExerciseChallenge />} />
                <Route
                  path="/my"
                  element={<NotLogin><MyPage /></NotLogin>}
                />
                <Route path='/runningRecord' element={<RunningRecord/>}></Route>
                <Route path="/runningRecordDetail/:runIdx" element={<RunningRecordDetail/>}></Route>
                <Route path="/login" element={<LoginPage />} />
                <Route path="/authgoogle" element={<GoogleLogin />} />
                <Route path="/authnaver" element={<NaverLogin />} />
                <Route path="/webcam" element={<WebCam />} />
                <Route path="/signup" element={<SignUpForm />} />
                <Route path="/squat" element={<Squat />} />
                <Route path="/situp" element={<Situp />} />
                <Route path="/pushup" element={<Pushup />} />
                <Route path="/challengemain" element={<ChallengeMain/>}/>
                <Route path="/" element={<Home />} />
                <Route path="/ranking" element={<Ranking />} />
                <Route path="/mychallengelist" element={<MyChallengeList />}/>
            </Routes>
        </MainLayout>
        
    );
};

export default RouterMain;