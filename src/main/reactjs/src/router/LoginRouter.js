import React from 'react';
import { Navigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { LoginAtom } from '../global/LoginAtom';

const LoginRouter = ({ children }) => {
    const isLogin = useRecoilValue(LoginAtom);

    if (isLogin === null) {
        return <Navigate to="/login" />;
    }

    return children;
};

export default LoginRouter
