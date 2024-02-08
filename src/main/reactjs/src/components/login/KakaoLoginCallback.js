import {useNavigate} from "react-router-dom";
import axios from "axios";
import {useEffect} from "react";

const KakaoLoginCallback = () => {
    const navigate = useNavigate();
    const code = new URL(window.location.href).searchParams.get('code')

    useEffect(() => {
        (async () => {
            try {
                const res = await axios.get(`https://localhost:9002/api/login/oauth2/token?code=${code}`);
                const token = res.headers.authorization;
                window.localStorage.setItem('token', token);
                navigate(`/`);
            } catch (e) {
                console.error(e);
                navigate('/');
            }
        })();
    }, []);
};
export default KakaoLoginCallback;