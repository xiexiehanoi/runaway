import React, {useEffect} from 'react';
import {useRecoilValue} from "recoil";
import {LoginAtom} from "../LoginAtom";
import {useNavigate} from "react-router-dom";

export const NotLogin = ({ children }) => {
  const isLogin = useRecoilValue(LoginAtom);
  const navi = useNavigate();

  useEffect(() => {
    // my 페이지에 접근할 때만 alert 창 띄우기
    if (isLogin === null) {
      alert('로그인 해주세요');
      navi('/login');
    }
  }, [isLogin, navi]);

  return children;
};

export default NotLogin;