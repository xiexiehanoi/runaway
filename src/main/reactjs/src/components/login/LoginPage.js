import React, {useState} from "react";
import "../../CSS/Login.css";
import { useNavigate } from "react-router-dom";
import KakaoLogin from "./KakaoLogin";
import NaverLogin from "./NaverLogin";
import GoogleLogin from "./GoogleLogin";

const LoginPage = () => {
  const navi = useNavigate();
  const BASE_URL = process.env.REACT_APP_BACKEND_URL;
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const checkLogin = async e => {
    e.preventDefault();

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
        navi('/');
      } else {
        throw new Error('로그인 실패');
      }
    } catch (error) {
      alert(error.message);
    }
  };
  return (
    <div className="mobile-section-login">
      <div className="mobile-login-title">LOGIN</div>
      <div className="mobile-login_cell__title">
        <span>아이디</span>
      </div>
      <div className="mobile-login_cell__body">
        <input
          type="text"
          name="email"
          maxLength="50"
          placeholder="ID"
          className="mobile-login_cell__input"
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div className="mobile-login_cell__title">
        <span>비밀번호</span>
      </div>
      <div className="mobile-login_cell__body">
        <input
          type="password"
          name="password"
          maxLength="50"
          placeholder="Password"
          className="mobile-login_cell__input"
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <div className="mobile-loginInput_cell">
        <div>
          <button className="btn btn-go" type="button" onClick={checkLogin}>
            <i className="fas fa-sign-in-alt"></i> Login
          </button>
          <button className="btn btn-back" type="button">
            <i className="fas fa-undo"></i> Back
          </button>
          <button
            className="btn btn-go"
            type="button"
            onClick={() => {
              navi("/signup");
            }}
          >
            <i className="fas fa-sign-in-alt"></i> 회원가입
          </button>
        </div>
        <div>
          <a href="../member/doFindLoginIdForm">ID 찾기</a> /{" "}
          <a href="../member/doFindLoginPwForm">PW 찾기</a>
        </div>
        <GoogleLogin />
        <NaverLogin />
        <KakaoLogin />
      </div>
    </div>
  );
};

export default LoginPage;
