import React from 'react';
import { useNavigate } from "react-router-dom";
import {useRecoilState} from "recoil";
import {LoginAtom} from "../../global/LoginAtom";

const Logout = () => {
  const [isLogin, setIsLogin] = useRecoilState(LoginAtom);
  const navi = useNavigate();
  const handleLogoutButtonClick = () => {
    const token = window.localStorage.removeItem("token");
    setIsLogin(token);
    alert("로그아웃 되었습니다.");
    navi("/login");
  };

  return (
    <div>
      <button className='btn primaryButton-outset'
              style={{margin: "10% 12%", width: '55%'}}
              onClick={handleLogoutButtonClick}>
                <span
                  style={{
                    color: '#f5f5f5',
                    fontWeight: '500',
                    fontSize: '1em'
                  }}
                >로그아웃</span>
      </button>
    </div>
  );
};

export default Logout;