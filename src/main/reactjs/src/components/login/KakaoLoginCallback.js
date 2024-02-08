import {useNavigate} from "react-router-dom";
import axios from "axios";
import {useEffect, useRef} from "react";

const KakaoLoginCallback = () => {
    const navigate = useRef(useNavigate());
    const BASE_URI = process.env.REACT_APP_BASE_URI;
    useEffect(() => {
        (async () => {
            try {
                const code = new URL(window.location.href).searchParams.get('code')

                const res = await axios.get(`${BASE_URI}/api/login/oauth2/token?code=${code}`);
                const token = res.headers.authorization;
                window.localStorage.setItem('token', token);
                navigate.current(`/`);
            } catch (e) {
                console.error(e);
                navigate.current('/');
            }
        })();
    }, []);
};
export default KakaoLoginCallback;