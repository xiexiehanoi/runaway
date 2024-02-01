import React from 'react';
import '../../CSS/Login.css'

const LoginPage = () => {

    return (
      <div className="mobile-section-login">
        <div className="mobile-login-title">LOGIN</div>
        <div className="mobile-login_cell__title">
          <span>아이디</span>
        </div>
        <div className="mobile-login_cell__body">
          <input
            type="text"
            name="loginId"
            maxLength="50"
            placeholder="ID"
            className="mobile-login_cell__input"
          />
        </div>
        <div className="mobile-login_cell__title">
          <span>비밀번호</span>
        </div>
        <div className="mobile-login_cell__body">
          <input
            type="password"
            name="loginPw"
            maxLength="50"
            placeholder="Password"
            className="mobile-login_cell__input"
          />
        </div>
        <div className="mobile-loginInput_cell">
          <div>
            <button className="btn btn-go" type="submit">
              <i className="fas fa-sign-in-alt"></i> Login
            </button>
            <button className="btn btn-back" type="button">
              <i className="fas fa-undo"></i> Back
            </button>
            <button className="btn btn-go" type="button">
              <i className="fas fa-sign-in-alt"></i> 회원가입
            </button>
          </div>
          <div>
            <a href="../member/doFindLoginIdForm">ID 찾기</a> / <a href="../member/doFindLoginPwForm">PW 찾기</a>
          </div>
          <button className='btn-social-login' style={{ backgroundColor: '#D93025' }}><i className="xi-2x xi-google"></i></button>&nbsp;&nbsp;
          <button className='btn-social-login' style={{ backgroundColor: '#1FC700' }}><i className="xi-2x xi-naver"></i></button>&nbsp;&nbsp;
          <button className='btn-social-login' style={{ backgroundColor: '#FFEB00' }}><i className="xi-2x xi-kakaotalk text-dark"></i></button>
        </div>
    </div>
    
  );
};

export default LoginPage;