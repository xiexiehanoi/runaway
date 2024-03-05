
import React from "react";
import { useNavigate, useLocation } from 'react-router-dom';
import backWhite from "../image/back-white.png";
import closeWhite from "../image/close-white.png";
import "./ScreenHeaderCSS.css"
import Swal from "sweetalert2";
import {LoginAtom} from "../global/LoginAtom";
import {useRecoilState} from "recoil";


function BackButton() {
    const navigate = useNavigate();
    const location = useLocation();

    const canGoBack = !(location.pathname === "/" || location.pathname === "/home")
    const imageStyle = canGoBack ? {} : { visibility: 'hidden' };

    const goBack = () => {
        navigate(-1);
    };

    return (
        <img src={backWhite} alt="Back" onClick={goBack} style={imageStyle} />
    );
}

function Logout() {
    const [ isLogin, setIsLogin] = useRecoilState(LoginAtom);
    const navigate = useNavigate();

    const logoutEvent = () => {
        const token = window.localStorage.removeItem("token");
        Swal.fire({
            icon: "success",
            title: '로그아웃 되었습니다.',
            confirmButtonText: "OK",
            allowOutsideClick: false,
            customClass: {
                confirmButton: 'sa2-confirm-button-class',
                title: 'sa2-title-class',
                icon: 'sa2-icon-class',
                popup: 'sa2-popup-class',
                container: 'sa2-container-class'
            }
        }).then(result => {
            if (result.isConfirmed) {
                setIsLogin(token);
                navigate("/login");
            }
        });
    }

    return (
        <img src={closeWhite} onClick={logoutEvent} alt={"logout"}/>
    )
}


const ScreenHeader = ({title}) => {
    return (
        <div className="header-in-screen">
            <BackButton />
            <span>{title}</span>
            <Logout />
        </div>
    );
}

export default ScreenHeader;