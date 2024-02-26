import React, { useRef, useState } from "react";
import "../../CSS/Login.css";
import { useNavigate } from "react-router-dom";
import KakaoLogin from "./KakaoLogin";
import NaverLogin from "./NaverLogin";
import GoogleLogin from "./GoogleLogin";
import { useRecoilState } from "recoil";
import { LoginAtom } from "../../global/LoginAtom";
import RunawayImage from "../../image/runaway.png";

const LoginPage = () => {
  const navi = useNavigate();
  const BASE_URL = process.env.REACT_APP_BACKEND_URL;
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const emailInputRef = useRef(null);
  const passwordInputRef = useRef(null);
  const [isLogin, setIsLogin] = useRecoilState(LoginAtom);

  const checkLogin = async e => {
    e.preventDefault();
    if (!email.trim()) {
      alert("이메일을 입력해주세요.");
      emailInputRef.current.focus();
      return;
    }

    if (!password.trim()) {
      alert("비밀번호를 입력해주세요.");
      passwordInputRef.current.focus();
      return;
    }
    try {
      const response = await fetch(`${BASE_URL}/api/user/sign-in`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      });

      const token = response.headers.get('Authorization');

      if (response.ok) {
        alert('로그인 성공');
        localStorage.setItem('token', token);
        setIsLogin(token);
        navi('/');
      } else {
        throw new Error('로그인 실패');
      }
    } catch (error) {
      alert(error.message);
    }
  };
  return (
    <div className="loginCotainter">

      <div className="login_content">
        <img src={RunawayImage} alt="user login" />
      </div>
      <div className="login_forms">
        <input className="login_input"
          type="text"
          name="email"
          maxLength="50"
          placeholder="ID"
          onChange={(e) => setEmail(e.target.value)}
          ref={emailInputRef} />
        <input className="login_input"
          type="password"
          maxLength="50"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
          ref={passwordInputRef} />

        <div style={{ textAlign: "right", marginTop: "-0.8%" }}>
          <a href="../member/doFindLoginIdForm">ID 찾기 </a>
          <span style={{ color: "#f5f5f5" }}>&nbsp;/&nbsp;</span>{" "}
          <a href="../member/doFindLoginPwForm"> PW 찾기</a>
        </div>

        <div>
          <button className='btn primaryButton-outset login_button' onClick={checkLogin}>
            <span
              style={{
                color: '#f5f5f5',
                fontWeight: '600',
                fontSize: '1.1em'
              }}>
              로그인
            </span>
          </button>
        </div>

        <div className="line">
          OR
        </div>
      </div>

      <div className="login_social"
        style={{ marginTop: "12px" }}>
        <GoogleLogin />
        <KakaoLogin />
        <NaverLogin />
      </div>
      <div style={{ textAlign: "center", marginTop: "56px" }}
        className="login_signup">
        <span className="login_account">계정이 없으신가요?</span>
        <span className="login_signin"
          onClick={() => {
            navi("/signup");
          }}>회원 가입</span>
      </div>
    </div>
  );
};

export default LoginPage;
