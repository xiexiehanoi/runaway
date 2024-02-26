import React from 'react';
import { Navigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { LoginAtom } from '../global/LoginAtom';

const LoginBackRouter = ({ children }) => {
    const isLogin = useRecoilValue(LoginAtom);

    if (isLogin) {
        return <Navigate to="/" />;
    }

    return children;
};

export default LoginBackRouter
