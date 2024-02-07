import {useNavigate} from "react-router-dom";
import axios from "axios";
import {useEffect} from "react";

const KakaoLoginCallback = (props) => {
    const code = new URL(window.location.href).searchParams.get('code')
    const navigate = useNavigate();

    useEffect(() => {
        (async () => {
            try {
                const res = await axios.get(`/api/user/oauth2/token?code=${code}`);
                const token = res.headers.authorization;
                window.localStorage.setItem('token', token);
                navigate(`/home?token=${token}`);
            } catch (e) {
                console.error(e);
                navigate('/');
            }
        })();
    }, []);


    return (
        <>
        </>
    );
};
export default KakaoLoginCallback;