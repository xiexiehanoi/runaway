import {useNavigate} from "react-router-dom";
import axios from "axios";
import {useEffect, useRef} from "react";
import {useRecoilState} from "recoil";
import {LoginAtom} from "../../global/LoginAtom";

const KakaoLoginCallback = () => {
    const navigate = useRef(useNavigate());
    const [isLogin, setIsLogin] = useRecoilState(LoginAtom);

    useEffect(() => {
        (async () => {
            try {
                const code = new URL(window.location.href).searchParams.get('code')
                const BACKEND_URI = process.env.REACT_APP_BACKEND_URL;
                const currentUrl = window.location.href;
                const callbackIndex = currentUrl.indexOf("callback/");
                const providerEndIndex = currentUrl.indexOf("?");
                let charactersAfterCallback= ""
                if (callbackIndex !== -1) {
                    charactersAfterCallback = currentUrl.substring(callbackIndex + "callback/".length, providerEndIndex);
                }

                const res = await axios.get(`${BACKEND_URI}/api/login/oauth2/token?code=${code}&provider=${charactersAfterCallback}`);
                const token = res.headers.authorization;
                window.localStorage.setItem('token', token);
                setIsLogin(token);
                navigate.current(`/`);
            } catch (e) {
                console.error(e);
                navigate.current('/');
            }
        })();
    }, []);
};
export default KakaoLoginCallback;